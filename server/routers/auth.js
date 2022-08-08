const express = require("express");
const AuthController = require("../controllers/auth");

const api = express.Router();

api.post("/sign-in", AuthController.login);
api.post("/refresh-access-token", AuthController.refreshAccessToken);
api.post('/google', AuthController.googleSignIn);

api.post('/forgotpassword', AuthController.forgotPassword);
api.put('/resetpassword/:resetToken', AuthController.resetPassword);

module.exports = api;