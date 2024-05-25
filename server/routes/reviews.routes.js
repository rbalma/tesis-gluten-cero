import express from "express";
import {
  addReview,
  getReviews,
  deleteReview,
  addReplyReview,
  deleteReplyReview,
  hasUserReview,
  getReviewsFromAllRecipes
} from "../controllers/reviews.controller.js";
import { validateJWT } from "../middlewares/validateJwt.js";

const router = express.Router();

router.get("/reviews/recipe/:recipeId", getReviews);
router.get("/reviews/market/:marketId", getReviews);

router.post("/reviews", validateJWT, addReview);
router.delete("/reviews/:reviewId", validateJWT, deleteReview);

router.post("/reply/review/:reviewId", validateJWT, addReplyReview);
router.delete("/reply/:replyId", validateJWT, deleteReplyReview);

router.get("/hasreview/user/:userId", validateJWT, hasUserReview);
router.get("/reviews/recipe/user/:userId", validateJWT, getReviewsFromAllRecipes);


export default router;