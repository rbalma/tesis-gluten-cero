const express = require('express');
const categoryController = require('../controllers/category');

const api = express.Router();

const md_auth = require("../middleware/authenticated");


api.post('/category', [md_auth.ensureAuth], categoryController.newCategory);
api.get('/category', categoryController.getCategory);
api.get('/category-pagination', categoryController.getCategoryByPagination);
api.delete('/category/:id', [md_auth.ensureAuth], categoryController.deleteCategory);


module.exports = api;