import express from 'express';
import {
  addNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
} from '../controllers/notice.js';

import { validateJWT } from '../middlewares/validateJwt.js';
import { uploadFile } from '../middlewares/uploadAvatar.js';

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

export default router;
