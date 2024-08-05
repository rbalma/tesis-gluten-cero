import express from 'express';
import {
  addThread,
  getThread,
  getThreadById,
  updateThread,
  deleteThread,
  likeThread,
} from '../controllers/thread.js';
import {
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/post.js';
import { validateJWT } from '../middlewares/validateJwt.js';

const router = express.Router();

/*
    THREADS
*/

router.route('/threads').get(getThread).post(validateJWT, addThread);
router
  .route('/threads/:threadId')
  .get(validateJWT, getThreadById)
  .put(validateJWT, updateThread)
  .delete(validateJWT, deleteThread);
router.route('/threads/like/:threadId').put(validateJWT, likeThread);

/*
    POSTS
*/

router.route('/posts').get(getPosts).post(validateJWT, addPost);
router
  .route('/posts/:postId')
  .get(validateJWT, getPostById)
  .put(validateJWT, updatePost)
  .delete(validateJWT, deletePost);

export default router;
