import express from 'express';
import { addComment, addCommentReply, getComments, deleteComment } from '../controllers/comment.js';
import { validateJWT } from '../middlewares/validateJwt.js';

const router = express.Router();

router.post('/comments', validateJWT, addComment);
router.post('/comments-reply/:commentId', validateJWT, addCommentReply);
router.get('/comments/:recipeId', getComments);
router.delete('/comments/:commentId', validateJWT, deleteComment);

export default router;