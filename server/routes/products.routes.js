import express from "express";
import { getProductsTypes, getProducts } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/types", getProductsTypes);

export default router;
