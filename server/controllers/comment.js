const Comment = require('../models/comments');

const addComment = async (req, res) => {
  const comment = new Comment(req.body);

  try {
    comment.user = req.user.id;
    const commentDB = await comment.save();

    res.json({ ok: true, post: commentDB });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Hable con el administrador" });
  }
};


// const addCommentReply = async (req, res) => {
//     const {id} = req.params;
//     const comment = new Comment(req.body);
  
//     try {
//       comment.user = req.user.id;
//       comment.isReply = true;
//       const commentDB = await comment.save();

//       if(commentDB){
//            await Comment.findByIdAndUpdate( id, { $push: { replies: commentDB._id } } );
//     }
  
//       res.json({
//         ok: true,
//         comment: commentDB
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         ok: false,
//         message: "Hable con el administrador",
//       });
//     }
// };

const getComments = async(req, res) => {
  const comments = await Comment.find().populate({
    path : 'user',
    select: 'name lastname avatar'
  });

  res.json({ ok: true, comments });
}

// const getComments = async(req, res) => {
//   const comments = await Comment.find().populate({
//     path : 'replies',
//     populate : {
//       path : 'user',
//       select: 'name lastname avatar'
//     }
//   });

//   res.json({ ok: true, comments });
// }


const deleteComment = async(req, res) => {
    const { id } = req.params;
  
    try {
        const comment = await Comment.findById( id );
        if(!comment){
           return res.status(404).json({
                ok: false,
                message: 'El comentario no existe por ese id'
            });
        }

       await Comment.findByIdAndDelete( id );
       res.json({ ok: true });

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }

}


const getCommentsByUser = async(req, res) => {
    const { idUser } = req.params;
    const comments = await Comment.find({ user: idUser });
    res.json({ ok: true, comments });
}


const getCommentsByRecipe = async(req, res) => {
  const { idRecipe } = req.params;
  const comments = await Comment.find({ recipe: idRecipe }).populate({
    path : 'user',
    select: 'name lastname avatarUrl'
  });
  res.json({ ok: true, comments });
}



module.exports = {
    addComment,
    getComments,
    deleteComment,
    getCommentsByUser,
    getCommentsByRecipe
}