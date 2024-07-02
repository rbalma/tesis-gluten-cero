import ErrorResponse from '../utils/errorResponse.js';
import Products from '../models/product.js';


// @desc Obtener el listado de productos aprobados por ANMAT
// @route /api/products-anmat
// @access Public
export const getProducts = async (req, res, next) => {
  try {
    const products = await Products.find().limit(50);

    res.json({
      data: products,
      count: products.length
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsTypes = async (req, res, next) => {
  try {
    const productsTypes = await Products.find().select('tipoProducto').distinct('tipoProducto');

    res.json({
      data: productsTypes,
      count: productsTypes.length
    });
  } catch (error) {
    next(error);
  }
};