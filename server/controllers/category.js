import Category from '../models/category.js';
import Recipe from '../models/recipe.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc Agregar una nueva categoría de receta
// @route /api/categories
// @access Private 
export const addCategory = async (req, res, next) => {
  try {
    const { name, description, type } = req.body;
    let category;

    if(req.file) {
      const imageBuffer = req.file.buffer;
      category = {
        name,
        description,
        avatar: {
          data: imageBuffer,
          contentType: req.file.mimetype,
        },
        type,
      }

      // Liberar memoria
      req.file.buffer = null;
    } else {
      category = {
        name,
        description,
        type,
      }
    }

    const newCategory = new Category(category);

    const savedCategory = await newCategory.save();
    res.json({ ok: true, data: savedCategory, message: 'Categoría agregada' });

  } catch(error) {
    console.log(error);
    next(error);
  };
};

// @desc Obtiene todas las categorias de las recetas
// @route /api/categories
// @access Public
export const getCategories = async (req, res, next) => {
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

// @desc Obtener una categoria
// @route /api/categories/:categoriesId
// @access Private
export const getCategoryById = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById({ _id: categoryId });
    if (!category) return next(new ErrorResponse("No existe la categoria", 404));

    return res.json({ ok: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc Elimina una categoria de receta
// @route /api/categories/:categoryId
// @access Private
export const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  console.log(req.body)
  try {
    const category = await Category.findById(categoryId);
    if (!category) return next(new ErrorResponse('La categoría no existe', 404));

    if (req.file) {
        req.body.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const categoryUpdated = await Category.findByIdAndUpdate(categoryId, req.body, {
      new: true,
    });

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
    if (!category) return next(new ErrorResponse('La categoría no existe', 404));

    // const recipe = await Recipe.findOne({ active: 1 }).populate({
    //   path: 'Category',
    //   _id: category._id,
    // });
    const recipe = await Recipe.findOne({ active: 1, category: category._id });
    if (recipe)
      return next(
        new ErrorResponse('Existe al menos una receta con esa categoría', 404)
      );

    await Category.findByIdAndDelete(categoryId);

    res.json({ ok: true, data: categoryId, message: 'Categoría eliminada' });
  } catch (error) {
    console.log(error)
    next(error);
  }
};
