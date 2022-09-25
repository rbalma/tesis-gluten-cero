const Post = require('../models/Post');
const Thread = require('../models/Thread');
const ErrorResponse = require('../utils/errorResponse');

// @desc Agregar un nuevo posteo
// @route POST /api/posts
// @access Private
exports.addPost = async (req, res, next) => {
  const { threadId } = req.body;
  const post = new Post(req.body);

  try {
    post.user = req.id;
    post.thread = threadId;

    const postDB = await post.save();
    await Thread.findByIdAndUpdate(threadId, { lastPost: postDB._id });

    res.json({
      ok: true,
      post: postDB,
      message: 'Posteo agregado',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Obtiene los posteos paginados
// @route GET /api/posts
// @access Public
exports.getPosts = async (req, res, next) => {
  const { page = 1, limit = 10, user, threadId } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: 1 },
    populate: [
      {
        path: 'user',
        select: 'name lastname avatar',
      },
      {
        path: 'postMother',
        select: 'content date user',
        populate: {
          path: 'user',
          select: 'name lastname',
        },
      },
    ],
  };

  let filters = {};
  if (threadId) filters = { thread: threadId };
  if (user) filters = { ...filters, user };

  try {
    const posts = await Post.paginate({ ...filters }, options);

    res.json({
      ok: true,
      data: posts.docs,
      totalPages: posts.totalPages,
      count: posts.totalDocs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Obtiene un posteo
// @route GET /api/posts/:postId
// @access Private
exports.getPostById = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return next(new ErrorResponse('No existe el posteo', 404));

    return res.json({ ok: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc Actualiza un posteo
// @route UPDATE /api/posts/:postId
// @access Private
exports.updatePost = async (req, res, next) => {
  const { postId } = req.params.idPost;

  try {
    const post = await Post.findById(postId);
    if (!post) return next(new ErrorResponse('No existe el posteo', 404));

    // Verifica que solo el usuario que creó el post pueda actualizarlo
    if (post.user.toString() !== req.id)
      return next(
        new ErrorResponse('No tiene privilegios para editar este posteo', 404)
      );

    const newPost = {
      ...req.body,
      user: req.id,
      thread: threadId,
      isUpdated: true,
    };

    const updatePost = await Post.findByIdAndUpdate(postId, newPost, {
      new: true,
    });

    res.json({
      ok: true,
      data: updatePost,
      message: 'Posteo actualizado',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Elimina un posteo
// @route DELETE /api/posts/:postId
// @access Private
exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return next(new ErrorResponse('No existe el posteo', 404));

    await Post.findByIdAndDelete(postId);
    res.json({ ok: true, data: postId, message: 'Posteo eliminado' });
  } catch (error) {
    next(error);
  }
};
