import Comment from '../models/comment.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc Agregar un nuevo comentario
// @route /api/comments
// @access Private
export const addComment = async (req, res, next) => {
  const comment = new Comment(req.body);
  try {
    comment.user = req.id;
    const newComment = await comment.save();

    res.json({ ok: true, data: newComment, message: 'Comentario agregado' });
  } catch (error) {
    next(error);
  }
};

// @desc Agregar una respuesta a un comentario
// @route /api/comments-reply/:commentId
// @access Private
export const addCommentReply = async (req, res, next) => {
    const { commentId } = req.params;
    const comment = new Comment(req.body);
  
    try {
      comment.user = req.id;
      comment.isReply = true;
      const commentDB = await comment.save();

      if(commentDB) await Comment.findByIdAndUpdate( commentId, { $push: { replies: commentDB._id } } );
  
      res.json({
        ok: true,
        data: commentDB
      });
    } catch (error) {
      next(error);
    }
};

// @desc Obtener los comentarios de una receta
// @route /api/comments/:recipeId
// @access Public
export const getComments = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const comments = await Comment.find({ recipe: recipeId })
      .populate({
        path: 'user',
        select: 'name lastname avatar',
      })
      .populate({
        path: 'replies',
        select: 'content date user',
        populate: { path: 'user', select: 'name lastname avatar' },
      });

    res.json({ ok: true, data: comments });
  } catch (error) {
    next(error);
  }
};

// @desc Eliminar un comentario de una receta
// @route /api/comments/:commentId
// @access Private
export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment)
      return next(new ErrorResponse('El comentario no existe', 404));

    await Comment.findByIdAndDelete(commentId);
    res.json({ ok: true, data: commentId, message: 'Comentario eliminado' });
  } catch (error) {
    next(error);
  }
};