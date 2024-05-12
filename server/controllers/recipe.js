import Recipe from '../models/recipe.js';
import User from "../models/user.js";
import Comment from '../models/comment.js';
import ErrorResponse from '../utils/errorResponse.js';
import { uploadImage, deleteImage } from '../services/cloudinary.js';
import fs from 'fs-extra';
 //https://github.com/telegraf/telegraf/discussions/1450

// @desc Agregar una nuevo receta
// @route /api/recipes
// @access Private
export const addRecipes = async (req, res, next) => {
  try {
    const recipe = new Recipe(req.body);
    recipe.user = req.id;

    if (!req.file) return next(new ErrorResponse('Debe subir una foto', 404));

    const result = await uploadImage(req.file.path, 'recipes');
    recipe.image = {
      public_id: result.public_id,
      secure_url: result.secure_url
    };
    await fs.unlink(req.file.path);

    const recipeDB = await recipe.save();

    res.json({
      ok: true,
      data: recipeDB,
      message: 'Receta creada',
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
      .populate('user', 'name lastname')
      .populate('category', 'name');
    if (!recipe) throw new ErrorResponse('No existe la receta', 404);

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
    categoryId,
    userName,
    userId,
    sortField,
    sortOrder,
    active
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
  if (active) filters.active = +active;
  if (title) filters.title = { $regex: title, $options: "i" };
  if (categoryId) filters.category = categoryId;
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
      if (users.length) filters.user = { $in: users.map( user => user._id) };
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

// @desc Habilitar la receta de un usuario para que se vea en la web
// @route /api/active-recipe/:recipeId
// @access Private
export const activateRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  const { active } = req.body;

  try {
    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { active },
      { new: true }
    );
    if (!recipe) return next(new ErrorResponse('No existe la receta', 404));

    return res.json({
      ok: true,
      data: recipe,
      message: active ? 'Receta activada' : 'Receta desactivada',
    });
  } catch (error) {
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
    if (!recipe) return next(new ErrorResponse('No existe la receta', 404));

    // Verifica que solo el usuario que creó la receta pueda actualizarlo
    if (recipe.user.toString() !== req.id)
      return next(
        new ErrorResponse('No tiene privilegios para editar esta receta', 401)
      );

    // En el body de la petición no viene el id del user
    const newRecipe = {
      ...req.body,
      user: req.id,
      date: Date.now(),
      active: false,
      isUpdated: true,
    };

    if (req.file) {
      const result = await uploadImage(req.file.path, 'recipes');
      newRecipe.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      };
      await fs.unlink(req.file.path);
      if (recipe.image?.public_id) await deleteImage(recipe.image.public_id);
    }

    const updateRecipe = await Recipe.findByIdAndUpdate(recipeId, newRecipe, {
      new: true,
    });

    res.json({
      ok: true,
      data: updateRecipe,
      message: 'Receta actualizada',
    });
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path);
    next(error);
  }
};

// @desc Eliminar una receta
// @route /api/recipes/:recipeId
// @access Private
export const deleteRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return next(new ErrorResponse('No existe la receta', 404));

    await Recipe.findByIdAndDelete(recipeId);
    if (recipe.image?.public_id) await deleteImage(recipe.image.public_id);
    await Comment.deleteMany({ recipe: recipeId });
    // await User.updateMany({}, { $pull: { favRecipes: id } });


    res.json({ ok: true, data: recipeId, message: 'Receta eliminada' });
  } catch (error) {
    next(error);
  }
};
