import express from 'express';
import { getProducts, addFileExcel } from '../controllers/products.js';
import { validateJWT } from '../middlewares/validateJwt.js';

const router = express.Router();

router
  .route('/products-anmat')
  .get(getProducts)
  .post(validateJWT, addFileExcel);

export default router;
