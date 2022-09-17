const express = require('express');
const router = express.Router();

const mapController = require('../controllers/map');
const { validateJWT } = require('../middlewares/validateJwt');

const md_upload = require("../middlewares/uploadMarket");

router.get('/markets', mapController.getMarkets);
router.get('/markets/:id', mapController.getMarketById);
router.get('/markets-picture/:picture', mapController.getPictureMarket);
router.post('/markets', [ validateJWT, md_upload.subirArchivo ], mapController.addMarket);
router.get('/search/markets', mapController.findMarkets);
//router.put('/map/places/:id', [md_auth], mapController.subirArchivo );
//router.delete('/map/places/:id', [md_auth], mapController);


module.exports = router;
