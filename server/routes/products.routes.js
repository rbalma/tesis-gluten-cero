const express = require('express');
const productsController = require('../controllers/products');
const { validateJWT } = require('../middlewares/validateJwt');

const api = express.Router();


api.get('/products-anmat', productsController.getProducts);
api.post('/products-anmat', validateJWT, productsController.subirArchivo );

module.exports = api;