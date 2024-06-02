import express from 'express';
import { getProducts, addFileExcel, updateProduct } from '../controllers/products.js';
import { validateJWT } from '../middlewares/validateJwt.js';

const router = express.Router();

router
  .route('/products-anmat')
  .get(getProducts)
  .post(validateJWT, addFileExcel);

router
  .route('/products-anmat/:productId')
  .put(validateJWT, updateProduct);

export default router;
