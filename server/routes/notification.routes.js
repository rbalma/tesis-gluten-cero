import express from "express";
import {
  addNotification,
  getNotification,
  updateNotification,
  deleteNotification,
  checkAllNotification,
  getUnreadNotifications,
  checkOrUncheckNotification,
} from "../controllers/notification.controller.js";
import { validateJWT } from "../middlewares/validateJwt.js";

const router = express.Router();

router.use(validateJWT);

router
  .route("/notifications")
  .get(getNotification)
  .post(addNotification)
  .patch(checkAllNotification);

router
  .route("/notifications/:notificationId")
  .get(getNotification)
  .put(updateNotification)
  .patch(checkOrUncheckNotification)
  .delete(deleteNotification);

router.get("/notifications/unread/user/:userId", getUnreadNotifications);

export default router;