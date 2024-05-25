import Reviews from "../models/reviews.js";
import ReplyReview from "../models/replyReview.js";
import ErrorResponse from "../utils/errorResponse.js";
import Recipe from "../models/recipe.js";
import Market from "../models/market.js";
import mongoose from "mongoose";

// @desc Agrega una nueva reseña para una receta o marcador
// @route /api/reviews/recipe/:recipeId o /api/reviews/market/:marketId
// @access Public
export const getReviews = async (req, res, next) => {
  const { recipeId, marketId } = req.params;
  const {
    page = 1,
    limit = 10,
    ratings,
    sortField,
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
          path: "market",
          select: "title",
        },
        {
          path: "reply",
          populate: {
            path: "user",
            select: "name lastname avatar",
          }
        },
      ],
    };

    if (sortField) options.sort = { [sortField]: sortOrder || 1 };

    const filters = {};
    if (recipeId) filters.recipe = recipeId;
    if (marketId) filters.market = marketId;
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

// @desc Agregar una nueva reseña para una receta o marcador
// @route /api/reviews
// @access Private
export const addReview = async (req, res, next) => {
  const { recipe, market } = req.body;
  
  try {
    const review = new Reviews(req.body);
    review.user = req.id;
    const newReview = await review.save();

    let newRating;
    let ratingCount;
    if (recipe) {
      const ratingSum = await Reviews.aggregate([
        { $match: { recipe: mongoose.Types.ObjectId(recipe) } },
        {
          $group: {
            _id: null,
            rating: { $sum: "$rating" },
          },
        },
      ]);

      ratingCount = await Reviews.count({ recipe });
      const ratingTotal = ratingSum[0].rating / ratingCount;

      newRating = Math.round((ratingTotal + Number.EPSILON) * 10) / 10;

      await Recipe.findByIdAndUpdate(recipe, {
        ratingAverage: newRating,
        ratingCount: ratingCount,
      });
    }

    if (market) {
      const ratingSum = await Reviews.aggregate([
        { $match: { market: mongoose.Types.ObjectId(market) } },
        {
          $group: {
            _id: null,
            rating: { $sum: "$rating" },
          },
        },
      ]);

      ratingCount = await Reviews.count({ market });
      const ratingTotal = ratingSum[0].rating / ratingCount;

      newRating = Math.round((ratingTotal + Number.EPSILON) * 100) / 100;

      await Market.findByIdAndUpdate(market, {
        ratingAverage: newRating,
        ratingCount: ratingCount,
      });
    }

    res.json({
      newReview,
      totalRating: newRating,
      countRating: ratingCount,
      message: "Reseña agregada",
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Elimina una reseña de la receta o marcador
// @route /api/reviews/:reviewId
// @access Private
export const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Reviews.findById(reviewId);
    if (!review) throw new ErrorResponse("La reseña no existe", 404);

    await Reviews.findByIdAndDelete(reviewId);

    let newRating;
    if (review.recipe) {
      const ratingSum = Reviews.aggregate([
        { $match: { recipe: review.recipe } },
        {
          $group: {
            _id: null,
            rating: { $sum: "$rating" },
            count: { $count: "$_id" },
          },
        },
      ]);

      newRating = ratingSum.rating / ratingSum.count;
      await Recipe.findByIdAndUpdate(review.recipe, {
        ratingAverage: newRating,
        ratingCount: ratingSum.count,
      });
    }

    if (review.market) {
      const ratingSum = Reviews.aggregate([
        { $match: { market: review.market } },
        {
          $group: {
            _id: null,
            rating: { $sum: "$rating" },
            count: { $count: "$_id" },
          },
        },
      ]);

      newRating = ratingSum.rating / ratingSum.count;
      await Market.findByIdAndUpdate(review.market, {
        ratingAverage: newRating,
        ratingCount: ratingSum.count,
      });
    }

    res.json({ reviewId, totalRating: newRating, message: "Reseña eliminada" });
  } catch (error) {
    console.log({ error });
    next(error);
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

    await ReplyReview.findByIdAndRemove(replyId, { reply: null });

    res.json({ replyId, message: "Respuesta eliminada" });
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
  const { recipeId, marketId } = req.query;

  try {
    const filters = { user: userId };
    if (recipeId) filters.recipe = recipeId;
    if (marketId) filters.market = marketId;

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
  const { userId } = req.params;
  const { 
    page = 1,
    limit = 10,
    withReply,
    withoutReply,
  } = req.query;

  try {

    const recipes = await Recipe.find({ user: userId }, '_id');

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
          path: "market",
          select: "title",
        },
        {
          path: "reply",
          populate: {
            path: "user",
            select: "name lastname avatar",
          }
        },
      ],
    };

    const filters = {};
    filters.recipe = { $in: recipes.map(recipe => recipe._id) };
    // if (markets) filters.market = { $nin: [null, ""] };
    // if (userId) filters.user = userId;
    if (withReply) filters.reply = { $nin: [null] };
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


// @desc Agrega una nueva reseña para una receta o marcador
// @route /api/reviews/recipe/:recipeId
// @access Private
export const getReviewsByUser = async (req, res, next) => {
  const { recipeId, marketId } = req.params;
  const {
    page = 1,
    limit = 10,
    ratings,
    sortField,
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
          path: "market",
          select: "title",
        },
        {
          path: "reply",
          populate: {
            path: "user",
            select: "name lastname avatar",
          }
        },
      ],
    };

    if (sortField) options.sort = { [sortField]: sortOrder || 1 };

    const filters = {};
    if (recipeId) filters.recipe = recipeId;
    if (marketId) filters.market = marketId;
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


