import Reviews from "../models/reviews.js";
import ReplyReview from "../models/replyReview.js";
import ErrorResponse from "../utils/errorResponse.js";
import Recipe from "../models/recipe.js";
import Marker from "../models/marker.js";
import mongoose from "mongoose";
import { events } from "../utils/events.js";
import { createNotification } from "../services/notifications.services.js";

// @desc Agrega una nueva reseña para una receta o marcador
// @route /api/reviews/recipe/:recipeId o /api/reviews/marker/:markerId
// @access Public
export const getReviews = async (req, res, next) => {
  const { recipeId, markerId } = req.params;
  const {
    page = 1,
    limit = 20,
    ratings,
    sortField,
    sortOrder,
    userId,
    withReply,
    withoutReply,
  } = req.query;

  try {
    const options = {
      page,
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        {
          path: "user",
          select: "name lastname avatar",
        },
        {
          path: "recipe",
          select: "title",
        },
        {
          path: "marker",
          select: "title",
        },
        {
          path: "reply",
          populate: {
            path: "user",
            select: "name lastname avatar",
          },
        },
      ],
    };

    if (sortField) options.sort = { [sortField]: sortOrder || 1 };

    const filters = {};
    if (recipeId) filters.recipe = recipeId;
    if (markerId) filters.marker = markerId;
    if (userId) filters.user = userId;
    if (ratings) filters.rating = { $in: ratings };
    if (withReply) filters.reply = { $nin: [null, ""] };
    if (withoutReply) filters.reply = { $eq: null };

    const reviews = await Reviews.paginate(filters, options);

    res.json({
      data: reviews.docs,
      totalPages: reviews.totalPages,
      count: reviews.totalDocs,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Cálcula el porcentaje de cada puntaje de un marcador
// @route /api/reviews/percentage/markers/:markerId
// @access Public
export const getPercentageReviews = async (req, res, next) => {
  const { markerId } = req.params;
  try {
    const p1 = Reviews.count({ marker: markerId, rating: 1 });
    const p2 = Reviews.count({ marker: markerId, rating: 2 });
    const p3 = Reviews.count({ marker: markerId, rating: 3 });
    const p4 = Reviews.count({ marker: markerId, rating: 4 });
    const p5 = Reviews.count({ marker: markerId, rating: 5 });

    const [ratingOne, ratingTwo, ratingThree, ratingFour, ratingFive] =
      await Promise.all([p1, p2, p3, p4, p5]);

    const ratingTotal =
      ratingOne + ratingTwo + ratingThree + ratingFour + ratingFive;

    const percentageOne =
      Math.round(((ratingOne * 100) / ratingTotal + Number.EPSILON) * 10) / 10;
    const percentageTwo =
      Math.round(((ratingTwo * 100) / ratingTotal + Number.EPSILON) * 10) / 10;
    const percentageThree =
      Math.round(((ratingThree * 100) / ratingTotal + Number.EPSILON) * 10) /
      10;
    const percentageFour =
      Math.round(((ratingFour * 100) / ratingTotal + Number.EPSILON) * 10) / 10;
    const percentageFive =
      Math.round(((ratingFive * 100) / ratingTotal + Number.EPSILON) * 10) / 10;

    res.json({
      percentageOne,
      percentageTwo,
      percentageThree,
      percentageFour,
      percentageFive,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc Agregar una nueva reseña para una receta o marcador
// @route /api/reviews
// @access Private
export const addReview = async (req, res, next) => {
  const { recipe, marker } = req.body;
  let notification;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const review = new Reviews(req.body);
    review.user = req.id;
    const newReview = await review.save({ session });

    let newRating;
    let ratingCount;
    if (recipe) {
      let ratingSum = await Reviews.aggregate([
        { $match: { recipe: mongoose.Types.ObjectId(recipe) } },
        {
          $group: {
            _id: null,
            rating: { $sum: "$rating" },
          },
        },
      ]);

      ratingSum = (ratingSum?.[0]?.rating || 0) + review.rating;

      ratingCount = await Reviews.count({ recipe });
      ratingCount += 1;

      const ratingTotal = ratingSum / ratingCount;

      newRating = Math.round((ratingTotal + Number.EPSILON) * 10) / 10;

      const recipeFound = await Recipe.findById(recipe, "_id title user");

      if (!recipeFound) throw new ErrorResponse("No existe la receta", 404);

      await Recipe.updateOne(
        { _id: recipe },
        {
          ratingAverage: newRating,
          ratingCount: ratingCount,
        },
        { session }
      );

      notification = {
        event: events.RECIPE_VALUED,
        originUser: `${req.user.name} ${req.user.lastname}`,
        notifiedUser: recipeFound.user,
        recipe,
        recipeTitle: recipeFound.title
      };

      await createNotification(notification, session);
    }

    if (marker) {
      let ratingSum = await Reviews.aggregate([
        { $match: { marker: mongoose.Types.ObjectId(marker) } },
        {
          $group: {
            _id: null,
            rating: { $sum: "$rating" },
          },
        },
      ]);
      ratingSum = (ratingSum?.[0]?.rating || 0) + review.rating;

      ratingCount = await Reviews.count({ marker });
      ratingCount += 1;

      const ratingTotal = ratingSum / ratingCount;

      newRating = Math.round((ratingTotal + Number.EPSILON) * 10) / 10;

      const markerFound = await Marker.findById(marker, "_id user");

      if (!markerFound) throw new ErrorResponse("No existe el marcador", 404);

      await Marker.updateOne(
        { _id: marker },
        {
          ratingAverage: newRating,
          ratingCount: ratingCount,
        },
        { session }
      );
    }

    await session.commitTransaction();

    res.json({
      newReview,
      totalRating: newRating,
      countRating: ratingCount,
      message: "Reseña agregada",
    });
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc Elimina una reseña de la receta o marcador
// @route /api/reviews/:reviewId
// @access Private
export const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const review = await Reviews.findById(reviewId);
    if (!review) throw new ErrorResponse("La reseña no existe", 404);

    await Reviews.findByIdAndDelete(reviewId, { session });

    if (review.reply) await ReplyReview.findByIdAndDelete(reply, { session });

    if (review.recipe) {
      let ratingSum = await Reviews.aggregate([
        { $match: { recipe: mongoose.Types.ObjectId(review.recipe) } },
        {
          $group: {
            _id: null,
            rating: { $sum: "$rating" },
          },
        },
      ]);

      ratingSum = ratingSum[0].rating - review.rating;

      let ratingCount = await Reviews.count({ recipe: review.recipe });
      ratingCount -= 1;

      const ratingTotal = ratingSum / ratingCount;

      const newRating = Math.round((ratingTotal + Number.EPSILON) * 10) / 10;

      await Recipe.findByIdAndUpdate(
        review.recipe,
        {
          ratingAverage: newRating,
          ratingCount: ratingCount,
        },
        { session }
      );
    }

    if (review.marker) {
      const ratingSum = await Reviews.aggregate([
        { $match: { marker: mongoose.Types.ObjectId(review.marker) } },
        {
          $group: {
            _id: null,
            rating: { $sum: "$rating" },
          },
        },
      ]);

      const ratingCount = await Reviews.count({ marker: review.marker });
      const ratingTotal =
        ratingCount > 0 ? ratingSum[0].rating / ratingCount : 0;

      const newRating = Math.round((ratingTotal + Number.EPSILON) * 100) / 100;

      await Marker.findByIdAndUpdate(
        review.marker,
        {
          ratingAverage: newRating,
          ratingCount: ratingCount,
        },
        { session }
      );
    }

    await session.commitTransaction();
    res.json({ reviewId, message: "Reseña eliminada" });
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc Agregar una respuesta a una reseña
// @route /api/reply/review/:reviewId
// @access Private
export const addReplyReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const reply = new ReplyReview(req.body);
    reply.user = req.id;
    reply.review = reviewId;
    const replyDB = await reply.save();

    if (replyDB)
      await Reviews.findByIdAndUpdate(reviewId, { reply: replyDB._id });

    res.json({
      reply: {
        ...replyDB._doc,
        user: {
          _id: replyDB.user,
          name: req.user.name,
          lastname: req.user.lastname,
          avatar: req.user.avatar,
        },
      },
      message: "Respuesta agregada",
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Eliminar una respuesta de una reseña
// @route /api/reply/:replyId
// @access Private
export const deleteReplyReview = async (req, res, next) => {
  const { replyId } = req.params;
  try {
    const reply = await ReplyReview.findById(replyId);
    if (!reply) throw new ErrorResponse("La respuesta no existe", 404);

    await Reviews.findByIdAndUpdate(reply.review, { reply: null });

    res.json({
      replyId,
      reviewId: reply.review,
      message: "Respuesta eliminada",
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Verifica si el usuario ya escribió una reseña en la receta o marcador
// @route /api/reviews/user/:userId
// @access Private
export const hasUserReview = async (req, res, next) => {
  const { userId } = req.params;
  const { recipeId, markerId } = req.query;

  try {
    const filters = { user: userId };
    if (recipeId) filters.recipe = recipeId;
    if (markerId) filters.marker = markerId;

    const review = await Reviews.findOne(filters);

    res.json({ hasReview: !!review, review });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Obtiene todas las reseñas que otros usuarios hicieron a las recetas o marcadores creados por el usuario logueado
// @route /api/reviews/recipe/user/:userId
// @access Public
export const getReviewsFromAllRecipes = async (req, res, next) => {
  const { page = 1, limit = 10, withReply, withoutReply } = req.query;

  try {
    const recipes = await Recipe.find({ user: req.id }, "_id");

    const options = {
      page,
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        {
          path: "user",
          select: "name lastname avatar",
        },
        {
          path: "recipe",
          select: "title",
        },
        {
          path: "reply",
          populate: {
            path: "user",
            select: "name lastname avatar",
          },
        },
      ],
    };

    const filters = {};
    filters.recipe = { $in: recipes.map((recipe) => recipe._id) };
    if (+withReply) filters.reply = { $nin: [null] };
    if (+withoutReply) filters.reply = { $eq: null };

    const reviews = await Reviews.paginate(filters, options);

    res.json({
      reviews: reviews.docs,
      totalPages: reviews.totalPages,
      count: reviews.totalDocs,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Obtiene todas las reseñas de recetas de un usuario
// @route /api/reviews/recipes/user/:userId
// @access Private
export const getReviewsRecipesByUser = async (req, res, next) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const options = {
      page,
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        {
          path: "user",
          select: "name lastname avatar",
        },
        {
          path: "recipe",
          select: "title",
        },
      ],
    };

    const filters = {};
    filters.recipe = { $nin: [null] };
    if (userId) filters.user = userId;

    const reviews = await Reviews.paginate(filters, options);

    res.json({
      reviews: reviews.docs,
      totalPages: reviews.totalPages,
      count: reviews.totalDocs,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Obtiene todas las reseñas de recetas de un usuario
// @route /api/reviews/recipe/user/:userId
// @access Private
export const getReviewsMarkersByUser = async (req, res, next) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const options = {
      page,
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        {
          path: "user",
          select: "name lastname avatar",
        },
        {
          path: "marker",
          select: "title",
        },
      ],
    };

    const filters = {};
    filters.marker = { $nin: [null] };
    if (userId) filters.user = userId;

    const reviews = await Reviews.paginate(filters, options);

    res.json({
      reviews: reviews.docs,
      totalPages: reviews.totalPages,
      count: reviews.totalDocs,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};
