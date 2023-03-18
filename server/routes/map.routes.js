import express from 'express';
const router = express.Router();

import { marketsByLocation, getMarkets, getMarketById, addMarket, activateMarket, updateMarket, deleteMarket } from '../controllers/map.js';
import { validateJWT } from '../middlewares/validateJwt.js';
import { uploadFile } from "../middlewares/uploadMarket.js";

router.get('/searching-map', marketsByLocation);
router.route('/markets').get(getMarkets).post([validateJWT, uploadFile], addMarket);
router.route('/active-market/:marketId').put(validateJWT, activateMarket);
router.route('/markets/:marketId').get(validateJWT, getMarketById).put([validateJWT, uploadFile], updateMarket).delete(validateJWT, deleteMarket);

export default router;
