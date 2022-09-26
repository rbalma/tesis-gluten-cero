const express = require('express');
const { addComment, addCommentReply, getComments, deleteComment } = require('../controllers/comment');
const { validateJWT } = require('../middlewares/validateJwt');

const router = express.Router();

router.post('/comments', validateJWT, addComment);
router.post('/comments-reply/:commentId', validateJWT, addCommentReply);
router.get('/comments/:recipeId', getComments);
router.delete('/comments/:commentId', validateJWT, deleteComment);

module.exports = router;