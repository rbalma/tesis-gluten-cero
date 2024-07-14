import express from "express";
import {
  getMarkersByLocation,
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

router.get("/location/markers", getMarkersByLocation);

router
  .route("/markers")
  .get(validateJWT, getMarkers)
  .post([validateJWT, uploadFile], addMarker);

router
  .route("/markers/:markerId")
  .get(validateJWT, getMarkerById)
  .put([validateJWT, uploadFile], updateMarker)
  .delete(validateJWT, deleteMarker)
  .patch(validateJWT, changeStatusMarker);

router
  .route("/favorites/markers")
  .get(validateJWT, getFavMarkers)
  .patch(validateJWT, addFavMarkers);

router.delete("/favorites/markers/:markerId", validateJWT, deleteFavMarkers);

export default router;
