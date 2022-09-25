const express = require('express');
const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');
const { validateJWT } = require('../middlewares/validateJwt');

const router = express.Router();

router.route('/categories').get(getCategory).post(validateJWT, addCategory);
router
  .route('/categories/:categoryId')
  .put(validateJWT, updateCategory)
  .delete(validateJWT, deleteCategory);

module.exports = router;
