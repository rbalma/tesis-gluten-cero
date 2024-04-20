import express from 'express';
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
} from '../controllers/category.js';
import { validateJWT } from '../middlewares/validateJwt.js';
import { uploadFile } from '../middlewares/uploadAvatar.js';

const router = express.Router();

router
  .route('/categories')
  .get(getCategories)
  .post([validateJWT, uploadFile], addCategory);
  
router
  .route('/categories/:categoryId')
  .get(getCategoryById)
  .put([validateJWT, uploadFile], updateCategory)
  .delete(validateJWT, deleteCategory);

export default router;
