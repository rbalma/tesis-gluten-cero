const express = require('express');
const threadsController = require('../controllers/thread');
const postController = require('../controllers/post');

const { validateJWT } = require('../middlewares/validateJwt');

const api = express.Router();

//api.use(md_auth.ensureAuth);

/*
    THREADS
*/
api.post("/threads", validateJWT, threadsController.newThread);
api.get("/threads", threadsController.getThread);
api.put("/threads/:id", validateJWT, threadsController.updateThread);
api.delete("/threads/:id", validateJWT, threadsController.deleteThread);
api.get("/threads/user/:user", validateJWT, threadsController.getThreadByUser);
api.get("/threads/:id", threadsController.getThreadById);


/*
    POSTS
*/
api.post("/threads/:id/posts", validateJWT, postController.addPost);
api.get("/threads/:id/posts", postController.getPosts);
api.get("/threads/:id/last-post", postController.getLastPost);
api.get("/posts/:idPost", postController.getPostById);
api.get("/posts/user/:idUser", validateJWT, postController.getPostsByUser);
api.put("/threads/:id/posts/:idPost", validateJWT, postController.updatePost);
api.delete("/posts/:idPost", validateJWT, postController.deletePost);


module.exports = api;