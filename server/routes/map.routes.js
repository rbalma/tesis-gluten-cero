import express from "express";
import {
  getMarkers,
  getMarkerById,
  addMarker,
  changeStatusMarker,
  updateMarker,
  deleteMarker,
  getFavMarkers,
  addFavMarkers,
  deleteFavMarkers,
  } from "../controllers/map.controller.js";
import { validateJWT } from "../middlewares/validateJwt.js";
import { uploadFile } from "../middlewares/uploadMarker.js";

const router = express.Router();

router
  .route("/markers")
  .get(getMarkers)
  .post([validateJWT, uploadFile], addMarker);

router
  .route("/markers/:markerId")
  .get(validateJWT, getMarkerById)
  .put([validateJWT, uploadFile], updateMarker)
  .delete(validateJWT, deleteMarker)
  .patch(validateJWT, changeStatusMarker);

  router.get('/favorites/markers', validateJWT, getFavMarkers);

  router
  .route('/favorites/markers/:markerId')
  .put(validateJWT, addFavMarkers)
  .delete(validateJWT, deleteFavMarkers);

export default router;
