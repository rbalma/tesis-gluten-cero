const express = require('express');
const {
  addThread,
  getThread,
  getThreadById,
  updateThread,
  deleteThread,
} = require('../controllers/thread');
const {
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/post');
const { validateJWT } = require('../middlewares/validateJwt');

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

/*
    POSTS
*/

router.route('/posts').get(getPosts).post(validateJWT, addPost);
router
  .route('/posts/:postId')
  .get(validateJWT, getPostById)
  .put(validateJWT, updatePost)
  .delete(validateJWT, deletePost);

module.exports = router;
