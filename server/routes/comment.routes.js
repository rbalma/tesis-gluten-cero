const express = require('express');
const commentController = require('../controllers/comment');
const { validateJWT } = require('../middlewares/validateJwt');

const api = express.Router();



api.post('/comments', validateJWT, commentController.addComment);
//api.post('/comments-reply/:id', validateJWT, commentController.addCommentReply);
api.get('/comments', commentController.getComments);
api.get('/comments/user/:idUser', commentController.getCommentsByUser);
api.get('/comments/recipe/:idRecipe', commentController.getCommentsByRecipe);
api.delete('/comments/:id', validateJWT, commentController.deleteComment);


module.exports = api;