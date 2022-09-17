const express = require('express');
const categoryController = require('../controllers/category');
const { validateJWT } = require('../middlewares/validateJwt');

const api = express.Router();


api.post('/category', validateJWT, categoryController.newCategory);
api.get('/category', categoryController.getCategory);
api.get('/category-pagination', categoryController.getCategoryByPagination);
api.delete('/category/:id', validateJWT, categoryController.deleteCategory);


module.exports = api;