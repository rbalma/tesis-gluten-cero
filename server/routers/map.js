const express = require('express');
const router = express.Router();

const mapController = require('../controllers/map');
const md_auth = require("../middleware/authenticated");
const md_upload = require("../middleware/uploadMarket");

router.get('/markets', mapController.getMarkets);
router.get('/markets/:id', mapController.getMarketById);
router.get('/markets-picture/:picture', mapController.getPictureMarket);
router.post('/markets', [ md_auth.ensureAuth, md_upload.subirArchivo ], mapController.addMarket);
router.get('/search/markets', mapController.findMarkets);
//router.put('/map/places/:id', [md_auth], mapController.subirArchivo );
//router.delete('/map/places/:id', [md_auth], mapController);


module.exports = router;
