import express from 'express';
import {
  addUsers,
  activeUserAccount,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addUserPanelAdmin,
} from '../controllers/user.controller.js';

import { validateJWT } from '../middlewares/validateJwt.js';
import { uploadFile } from '../middlewares/uploadAvatar.js';

const router = express.Router();

router.route('/users').post(addUsers).get(validateJWT, getUsers);

router
  .route('/users/:userId')
  .get(validateJWT, getUserById)
  .put([validateJWT, uploadFile], updateUser)
  .delete(validateJWT, deleteUser);

router.post('/admin/users', [validateJWT, uploadFile], addUserPanelAdmin)

router.route('/active-account/:userId').patch(activeUserAccount);

export default router;
