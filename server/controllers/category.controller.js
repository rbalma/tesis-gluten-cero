import { fsUnlink } from "../utils/fsUnlink.js";
import Category from "../models/category.js";
import Recipe from "../models/recipe.js";
import ErrorResponse from "../utils/errorResponse.js";

const pathUploadCategory = "/categories";

// @desc Agregar una nueva categoría
// @route /api/categories
// @access Private
export const addCategory = async (req, res, next) => {
  try {
    if (!req.file)
      throw new ErrorResponse("Debe subir la foto de la categoría", 400);

    req.body.image = req.file.filename;

    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();

    res.json({ data: savedCategory, message: "Categoría agregada" });
  } catch (error) {
    if (req.file) fsUnlink(`${pathUploadCategory}/${req.file.filename}`);
    console.log(error);
    next(error);
  }
};

// @desc Obtiene todas las categorias
// @route /api/categories
// @access Public
export const getCategories = async (req, res, next) => {
  const { type, visible, name, sortField, sortOrder } = req.query;
  try {
    const filters = {};
    if (type) filters.type = type;
    if (visible) filters.visible = +visible;
    if (name) filters.name = { $regex: name, $options: 'i' };

    let sorter = { name: 1 };
    if (sortField) sorter = { [sortField]: sortOrder || 1 }

    const categories = await Category.find(filters).sort(sorter);

    res.json({
      data: categories,
    });
  } catch (error) {
    console.log({ error })
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
    if (!category) throw new ErrorResponse("No existe la categoria", 404);

    return res.json({ ok: true, data: category });
  } catch (error) {
    next(error);
  }
};

// @desc Actualiza una categoria
// @route /api/categories/:categoryId
// @access Private
export const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) throw new ErrorResponse("La categoría no existe", 404);

    if (req.file) {
      req.body.image = req.file.filename;
      try {
        fsUnlink(`${pathUploadCategory}/${category.image}`);
      } catch (error) {
        console.log(error);
      }
    }

    const categoryUpdated = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      data: categoryUpdated,
      message: "Categoría actualizada",
    });
  } catch (error) {
    if (req.file) fsUnlink(`${pathUploadCategory}/${req.file.filename}`);
    console.log(error);
    next(error);
  }
};

// @desc Elimina una categoria
// @route /api/categories/:categoryId
// @access Private
export const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) throw new ErrorResponse("La categoría no existe", 404);

    const recipe = await Recipe.findOne({ active: 1, category: category._id });
    if (recipe)
      throw new ErrorResponse(
        "Existe al menos una receta con esa categoría",
        404
      );

    await Category.findByIdAndDelete(categoryId);

    try {
      fsUnlink(`${pathUploadCategory}/${category.image}`);
    } catch (error) {
      console.log(error);
    }

    res.json({ data: categoryId, message: "Categoría eliminada" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
