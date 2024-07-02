import express from "express";
import { getProductsTypes, getProducts, updateProduct } from "../controllers/products.controller.js";
import { validateJWT } from '../middlewares/validateJwt.js';

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/types", getProductsTypes);

router
  .route('/products-anmat/:productId')
  .put(validateJWT, updateProduct);

export default router;
