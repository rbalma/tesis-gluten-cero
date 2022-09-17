const express = require('express');
const { login, googleSignIn, forgotPassword, resetPassword, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJwt');

const router = express.Router();

router.route('/login').post(login);
router.route('/login-google').post(googleSignIn);
router.route('/refresh-token').get(validateJWT, renewToken);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:resetToken').put(resetPassword);

module.exports = router;