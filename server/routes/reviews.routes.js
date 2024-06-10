import express from "express";
import {
  addReview,
  getReviews,
  deleteReview,
  addReplyReview,
  deleteReplyReview,
  hasUserReview,
  getReviewsFromAllRecipes,
  getReviewsRecipesByUser
} from "../controllers/reviews.controller.js";
import { validateJWT } from "../middlewares/validateJwt.js";

const router = express.Router();

router.get("/reviews/recipe/:recipeId", getReviews);
router.get("/reviews/marker/:markerId", getReviews);

router.post("/reviews", validateJWT, addReview);
router.delete("/reviews/:reviewId", validateJWT, deleteReview);

router.post("/reply/review/:reviewId", validateJWT, addReplyReview);
router.delete("/reply/:replyId", validateJWT, deleteReplyReview);

router.get("/hasreview/user/:userId", validateJWT, hasUserReview);
router.get("/reviews/recipes/users", validateJWT, getReviewsFromAllRecipes);
router.get("/reviews/recipe/user/:userId", validateJWT, getReviewsRecipesByUser);


export default router;