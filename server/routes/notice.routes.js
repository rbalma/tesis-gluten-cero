const express = require('express');
const noticeController = require('../controllers/notice');
const { validateJWT } = require('../middlewares/validateJwt');

const api = express.Router();


api.post("/new-notice", validateJWT, noticeController.subirArchivo, noticeController.newNotice);
api.get("/get-image/:imageName", noticeController.getImage);
api.put("/update-notice/:id", validateJWT, noticeController.subirArchivo, noticeController.updateNotice);
api.delete("/delete-notice/:id", validateJWT, noticeController.deleteNotice);
api.get("/notices", noticeController.getNotices);
api.get("/get-notice/:id", validateJWT, noticeController.getNoticeById);


module.exports = api;