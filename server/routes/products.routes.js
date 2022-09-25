const express = require('express');
const { getProducts, addFileExcel } = require('../controllers/products');
const { validateJWT } = require('../middlewares/validateJwt');

const router = express.Router();

router
  .route('/products-anmat')
  .get(getProducts)
  .post(validateJWT, addFileExcel);

module.exports = router;
