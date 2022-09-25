const express = require('express');
const {
  addNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} = require('../controllers/notice');

const { validateJWT } = require('../middlewares/validateJwt');
const { uploadFile } = require('../middlewares/uploadAvatar');

const router = express.Router();

router
  .route('/notices')
  .post([validateJWT, uploadFile], addNotice)
  .get(getNotices);
  
router
  .route('/notices/:noticeId')
  .get(getNoticeById)
  .put([validateJWT, uploadFile], updateNotice)
  .delete(validateJWT, deleteNotice);

module.exports = router;
