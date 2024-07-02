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

// @desc Actualiza un producto
// @route PUT /api/products-anmat/:productId
// @access Private
export const updateProduct = async (req, res, next) => {
  const { productId } = req.params;

  //console.log(productId);
  try {
    const product = await Products.findById(productId);
    if (!product) return next(new ErrorResponse('No existe el Producto', 404));

    const newProduct = {
      ...req.body,
      user: req.id,
      isUpdated: true
    };

    const updateProduct = await Products.findByIdAndUpdate(productId, newProduct, {
      new: true,
    });

    res.json({
      ok: true,
      thread: updateProduct,
      message: 'Producto actualizado'
    });
  } catch (error) {
    next(error);
  }
};