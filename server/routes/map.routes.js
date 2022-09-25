const express = require('express');
const router = express.Router();

const { marketsByLocation, getMarkets, getMarketById, addMarket, activateMarket, updateMarket, deleteMarket } = require('../controllers/map');
const { validateJWT } = require('../middlewares/validateJwt');
const { uploadFile } = require("../middlewares/uploadMarket");

router.get('/map', marketsByLocation);
router.route('/markets').get(getMarkets).post([validateJWT, uploadFile], addMarket);
router.route('/active-market/:marketId').put(validateJWT, activateMarket);
router.route('/markets/:marketId').get(validateJWT, getMarketById).put([validateJWT, uploadFile], updateMarket).delete(validateJWT, deleteMarket);

module.exports = router;
