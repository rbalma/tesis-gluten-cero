const Category = require('../models/Category');
const Recipe = require('../models/Recipe');
const ErrorResponse = require('../utils/errorResponse');

// @desc Agregar una nueva categoría de receta
// @route /api/categories
// @access Private
exports.addCategory = async (req, res, next) => {
  const { name, color } = req.body;

  try {
    const category = await Category.save({ name, color });
    if (!category)
      return next(new ErrorResponse('La categoría no se pudo crear', 404));

    res.json({ ok: true, data: category, message: 'Categoría agregada' });
  } catch (error) {
    next(error);
  }
};

// @desc Obtiene todas las categorias de las recetas
// @route /api/categories
// @access Public
exports.getCategory = async (req, res, next) => {
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
exports.updateCategory = async (req, res, next) => {
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
exports.deleteCategory = async (req, res, next) => {
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
