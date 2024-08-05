import mongoose from "mongoose";
import Products from "../models/product.js";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc Obtener el listado de productos aprobados por ANMAT
// @route /api/products
// @access Public
export const getProducts = async (req, res, next) => {
  const {
    page = 1,
    limit = 50,
    type,
    brand,
    name,
    sortField,
    state,
    isExport = 0,
  } = req.query;
  try {
    const options = {
      page,
      limit: parseInt(limit),
      sort: { denominacionVenta: 1 },
      select: isExport
        ? ["-_id", "denominacionVenta", "tipoProducto", "marca"]
        : ["-estado"],
    };

    if (sortField) options.sort = { [sortField]: sortField === 'likesCount' ? -1 : 1 };

    const filters = {};
    if (name) filters.denominacionVenta = { $regex: name, $options: "i" };
    if (type) filters.tipoProducto = { $regex: type };
    if (brand) filters.marca = { $regex: brand, $options: "i" };
    if (state) filters.estado = { $regex: state };

    const products = await Products.paginate(filters, options);

    res.json({
      products: products.docs,
      totalPages: products.totalPages,
      count: products.totalDocs,
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

// @desc Obtiene todos los tipos de productos sin duplicados
// @route GET /api/types/products
// @access Public
export const getProductsTypes = async (req, res, next) => {
  try {
    const productsTypes = await Products.find()
      .select("tipoProducto")
      .distinct("tipoProducto");

    res.json({
      productsTypes: productsTypes.map((productype) => {
        const lowercase = productype.toLowerCase();
        return {
          label: lowercase.charAt(0).toUpperCase() + lowercase.slice(1),
          value: productype,
        };
      }),
      count: productsTypes.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Actualizar un producto
// @route /api/products/:productsId
// @access Private
export const putProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Products.findById(productId);
    if (!product) throw new ErrorResponse("El producto no existe", 404);

    const productUpdated = await Products.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      notice: productUpdated,
      message: "Producto actualizada",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc Eliminar un producto
// @route /api/products/:productsId
// @access Private
export const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Products.findById(productId);
    if (!product) throw new ErrorResponse("El producto no existe", 404);

    await Products.findByIdAndDelete(productId);

    res.json({ productId, message: "Producto eliminada" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc Agrega o quita un producto como favorito del usuario
// @route PUT /favorites/products/:productId
// @access Private
export const setCountLikeProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { isLiked } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (typeof isLiked !== 'boolean')
      throw new ErrorResponse("No se puede completar la operación", 400);

    const product = await Products.findById(productId);
    if (!product) throw new ErrorResponse("No existe el Producto", 404);

    const newCount = isLiked ? product.likesCount + 1 : product.likesCount - 1;

    const productUpdeted = await Products.findByIdAndUpdate(
      productId,
      { likesCount: newCount },
      {
        new: true,
        session,
      }
    );

    const operation = isLiked
      ? { $push: { favProducts: productId } }
      : { $pull: { favProducts: productId } };

    await User.findByIdAndUpdate(req.id, operation, { session });

    await session.commitTransaction();

    res.json({
      product: productUpdeted,
      message: isLiked ? "Se agregó a favoritos" : "Se quitó de favoritos",
    });
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};


// @desc Obtiene los productos favoritos del usuario logueado
// @route GET /api/favorites/user/products
// @access Private
export const getProductsByUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.id).select("_id").populate({
      path: "favProducts",
      select: "_id denominacionVenta marca",
    });
    if (!user._id) throw new ErrorResponse("El usuario no existe");

    res.json({ favProducts: user.favProducts, count: user.favProducts.length });
  } catch (error) {
    console.log(error);
    next(error);
  }
};