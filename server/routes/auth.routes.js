import express from 'express';
import { login, googleSignIn, forgotPassword, resetPassword, renewToken } from '../controllers/auth.controller.js';
import { validateJWT } from '../middlewares/validateJwt.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/login-google').post(googleSignIn);
router.route('/refresh-token').get(validateJWT, renewToken);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:resetToken').put(resetPassword);

export default router;