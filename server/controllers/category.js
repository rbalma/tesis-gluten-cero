import Category from '../models/category.js';
import Recipe from '../models/recipe.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc Agregar una nueva categoría de receta
// @route /api/categories
// @access Private
export const addCategory = async (req, res, next) => {
  const category = new Category(req.body);

  try {
    const categoryDB = await category.save();
    if (!categoryDB)
      return next(new ErrorResponse('La categoría no se pudo crear', 404));

    res.json({ ok: true, data: categoryDB, message: 'Categoría agregada' });
  } catch (error) {
    next(error);
  }
};

// @desc Obtiene todas las categorias de las recetas
// @route /api/categories
// @access Public
export const getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({
      ok: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Elimina una categoria de receta
// @route /api/categories/:categoryId
// @access Private
export const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category)
      return next(new ErrorResponse('La categoría no existe', 404));

    const categoryUpdated = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      data: categoryUpdated,
      message: 'Categoría actualizada',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Elimina una categoria de receta
// @route /api/categories/:categoryId
// @access Private
export const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category)
      return next(new ErrorResponse('La categoría no existe', 404));

    const recipe = await Recipe.findOne({ active: 1 }).populate({
      path: 'Category',
      _id: category._id,
    });
    if (recipe)
      return next(
        new ErrorResponse('Existe al menos una receta con esa categoría', 404)
      );

    await Category.findByIdAndDelete(categoryId);

    res.json({ ok: true, data: categoryId, message: 'Categoría eliminada' });
  } catch (error) {
    next(error);
  }
};
