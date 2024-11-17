import express from "express";
import {
  addNotification,
  getNotification,
  updateNotification,
  deleteNotification,
  checkAllNotification,
  getUnreadNotifications,
  checkOrUncheckNotification,
  createSubscription,
  deleteSubscription
} from "../controllers/notification.controller.js";
import { validateJWT } from "../middlewares/validateJwt.js";

const router = express.Router();

router.route("/notifications").get(validateJWT, getNotification).post(validateJWT, addNotification);

router
  .route("/notifications/:notificationId")
  .get(validateJWT, getNotification)
  .put(validateJWT, updateNotification)
  .patch(validateJWT, checkOrUncheckNotification)
  .delete(validateJWT, deleteNotification);

router
  .route("/notifications/unread/user/:userId")
  .get(validateJWT, getUnreadNotifications)
  .patch(validateJWT, checkAllNotification);

router.post("/subscription", validateJWT, createSubscription);
router.delete("/subscription/:authId", deleteSubscription);

export default router;
