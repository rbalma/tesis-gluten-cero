const express = require('express');
const commentController = require('../controllers/comment');

const api = express.Router();

const md_auth = require("../middleware/authenticated");


api.post('/comments', [md_auth.ensureAuth], commentController.addComment);
//api.post('/comments-reply/:id', [md_auth.ensureAuth], commentController.addCommentReply);
api.get('/comments', commentController.getComments);
api.get('/comments/user/:idUser', commentController.getCommentsByUser);
api.get('/comments/recipe/:idRecipe', commentController.getCommentsByRecipe);
api.delete('/comments/:id', [md_auth.ensureAuth], commentController.deleteComment);


module.exports = api;