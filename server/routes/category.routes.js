import express from 'express';
import {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.js';
import { validateJWT } from '../middlewares/validateJwt.js';

const router = express.Router();

router.route('/categories').get(getCategory).post(validateJWT, addCategory);
router
  .route('/categories/:categoryId')
  .put(validateJWT, updateCategory)
  .delete(validateJWT, deleteCategory);

export default router;
