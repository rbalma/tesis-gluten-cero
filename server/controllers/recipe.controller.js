import mongoose from "mongoose";
import fs from "fs-extra";
import Recipe from "../models/recipe.js";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";
import { uploadImage, deleteImage } from "../services/cloudinary.js";
import { createNotification } from "../services/notifications.services.js";
import { events } from "../utils/events.js";
import RejectedRecipes from "../models/rejectedRecipes.js";
import handlebars from "handlebars";
import dirnamePath from "../dirnamePath.js";
import { URL_FRONT } from "../config/config.js";
import sendEmail from "../services/sendEmail.js";

// @desc Agregar una nuevo receta
// @route /api/recipes
// @access Private
export const addRecipes = async (req, res, next) => {
  try {
    const recipe = new Recipe(req.body);
    recipe.user = req.id;

    if (!req.file) return next(new ErrorResponse("Debe subir una foto", 404));

    const result = await uploadImage(req.file.path, "recipes");
    recipe.image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.file.path);

    const recipeDB = await recipe.save();

    try {
      fs.readFile(
        dirnamePath + "/utils/templatesMails/recipePending.html",
        { encoding: "utf-8" },
        function (err, html) {
          if (err) {
            throw new Error(err);
          } else {
            const template = handlebars.compile(html);
            const replacements = {
              url: `${URL_FRONT}`,
              name: req.user.name,
              lastName: req.user.lastname,
              recipeName: recipeDB.title,
              recipeId: recipeDB._id,
            };
            const htmlToSend = template(replacements);
            sendEmail({
              to: 'glutencerooficial@gmail.com',
              subject: "Nueva receta para revisar",
              text: htmlToSend,
            });
          }
        }
      );
    } catch (error) {
      return next(new ErrorResponse("El correo no pudo ser enviado", 500));
    }

    res.json({
      ok: true,
      data: recipeDB,
      message: "Receta creada",
    });
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path);
    console.log(error);
    next(error);
  }
};

// @desc Obtener una receta
// @route /api/recipes/:recipeId
// @access Public
export const getRecipesById = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId)
      .populate("user", "name lastname")
      .populate("category", "name");
    if (!recipe) throw new ErrorResponse("No existe la receta", 404);

    return res.json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

// @desc Obtener las recetas paginadas
// @route /api/recipes
// @access Public
export const getRecipes = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    title,
    categoriesIds,
    userName,
    userId,
    sortField,
    sortOrder,
    state,
  } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { createdAt: 1 },
    populate: [
      {
        path: "user",
        select: "name lastname",
      },
      {
        path: "category",
        select: "name",
      },
    ],
  };

  if (sortField) options.sort = { [sortField]: sortOrder || 1 };

  const filters = {};
  if (state) filters.state = state;
  if (title) filters.title = { $regex: title, $options: "i" };
  if (categoriesIds) filters.category = { $in: categoriesIds };
  if (userId) filters.user = userId;

  try {
    if (userName) {
      const users = await User.find(
        {
          $or: [
            { name: { $regex: userName, $options: "i" } },
            { lastname: { $regex: userName, $options: "i" } },
          ],
        },
        "_id"
      );
      if (users.length) filters.user = { $in: users.map((user) => user._id) };
    }

    const recipes = await Recipe.paginate(filters, options);

    res.json({
      data: recipes.docs,
      totalPages: recipes.totalPages,
      count: recipes.totalDocs,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Aprueba o rechaza la receta de un usuario para que se vea en la web
// @route PATCH /api/recipes/:recipeId
// @access Private
export const changeStatusRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  const { state, rejectedDescription } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const recipe = await Recipe.findById(recipeId, "_id title user");

    if (!recipe) throw new ErrorResponse("No existe la receta", 404);

    await Recipe.updateOne({ _id: recipeId }, { state }, { session });

    if (state === "error") {
      const rejectedRecipes = new RejectedRecipes({
        description: rejectedDescription,
        recipe: recipeId,
        admin: req.id,
      });
      await rejectedRecipes.save({ session });
    }

    const notification = {
      event:
        state === "success" ? events.RECIPE_APPROVED : events.RECIPE_REJECTED,
      originUser: `${req.user.name} ${req.user.lastname}`,
      notifiedUser: recipe.user,
      recipe: recipeId,
      description: state === "success" ? `La receta "${recipe.title}" fue agregada a Gluten Cero y ya puede ser visitada por cualquier usuario.` : 
      `La receta "${recipe.title}" no cumple con todos los requisitos para ser agregada a Gluten Cero.`,
    };

    await createNotification(notification, session);

    await session.commitTransaction();

    res.json({
      recipeId,
      message: state ? "Receta aprobada" : "Receta rechazada",
    });
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc Obtiene el motivo del rechazo de una receta
// @route GET /api/rejected/recipes/:recipeId
// @access Private
export const getRejectedRecipeInfo = async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    const rejected = await RejectedRecipes.findOne({ recipe: recipeId }).sort(
      "-createdAt"
    );

    res.json({
      rejected,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Actualizar una receta
// @route /api/recipes/:recipeId
// @access Private
export const updateRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw new ErrorResponse("No existe la receta", 404);

    // Verifica que solo el usuario que creó la receta pueda actualizarlo
    if (recipe.user.toString() !== req.id)
      throw new ErrorResponse(
        "No tiene privilegios para editar esta receta",
        401
      );

    // En el body de la petición no viene el id del user
    const newRecipe = {
      ...req.body,
      user: req.id,
      state: "pending",
      isUpdated: true,
    };

    if (req.file) {
      const result = await uploadImage(req.file.path, "recipes");
      newRecipe.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.file.path);
      if (recipe.image?.public_id) await deleteImage(recipe.image.public_id);
    }

    const updateRecipe = await Recipe.findByIdAndUpdate(recipeId, newRecipe, {
      new: true,
    });

    res.json({
      data: updateRecipe,
      message: "Receta actualizada",
    });
  } catch (error) {
    try {
      if (req.file) await fs.unlink(req.file.path);
    } catch (error) {
      console.log(error);
    }
    console.log(error);
    next(error);
  }
};

// @desc Eliminar una receta
// @route /api/recipes/:recipeId
// @access Private
export const deleteRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return next(new ErrorResponse("No existe la receta", 404));

    await Recipe.findByIdAndDelete(recipeId, { session });

    if (recipe.image?.public_id) await deleteImage(recipe.image.public_id);

    await session.commitTransaction();
    res.json({ recipeId, userId: recipe.user, message: "Receta eliminada" });
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc Obtiene las últimas recetas para mostrar en el sidebar del detalle de la receta excluyendo la receta del detalle
// @route /api/sidebar/recipes/:recipeId
// @access Public
export const getLastRecipesSideBar = async (req, res, next) => {
  const { recipeId } = req.params;

  const options = {
    page: 1,
    limit: 3,
    sort: { createdAt: 1 },
    select: ["_id", "title", "image"],
    populate: [
      {
        path: "category",
        select: "name",
      },
    ],
  };

  try {
    const recipes = await Recipe.paginate(
      { _id: { $ne: recipeId }, state: "success" },
      options
    );

    res.json({
      data: recipes.docs,
      count: recipes.totalDocs,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Obtiene el detalle de las recetas favoritas de un usuario
// @route GET /api/favorites/recipes
// @access Private
export const getFavRecipes = async (req, res, next) => {
  try {
    const user = await User.findById(req.id).select("_id").populate({
      path: "favRecipes",
      select: "title category image ratingAverage ratingCount createdAt",
      populate: "category",
    });

    if (!user._id) return next(new ErrorResponse("El usuario no existe"));

    res.json({
      favRecipes: user.favRecipes,
      count: user.favRecipes.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc agrega una receta como favorita de un usuario
// @route PATCH /api/favorites/recipes
// @access Private
export const addFavRecipe = async (req, res, next) => {
  const { recipeId } = req.body;

  try {
    await User.findByIdAndUpdate(req.id, { $push: { favRecipes: recipeId } });

    res.json({ message: "Se agregó a favoritos" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc elimina una receta como favorita de un usuario
// @route DELETE /api/favorites/recipes/:recipeId
// @access Private
export const deleteFavRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    await User.findByIdAndUpdate(req.id, { $pull: { favRecipes: recipeId } });
    res.json({ message: "Se quitó de favoritos" });
  } catch (error) {
    next(error);
  }
};
