import express from "express";
import {
  getProductsTypes,
  getProducts,
  putProduct,
  setCountLikeProduct,
  deleteProduct,
  getProductsByUser
} from "../controllers/products.controller.js";
import { validateJWT } from "../middlewares/validateJwt.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/types/products", getProductsTypes);

router.get("/favorites/user/products", validateJWT, getProductsByUser);

router
  .route("/favorites/products/:productId")
  .put(validateJWT, setCountLikeProduct);

router
  .route("/products/:productId")
  .put(validateJWT, putProduct)
  .delete(validateJWT, deleteProduct);

export default router;
