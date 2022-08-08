const Post = require('../models/post');
const Thread = require('../models/thread');



const newThread = async (req, res) => {
  const thread = new Thread();

  const { title, content } = req.body;
  thread.title = title;
  thread.content = content;

  try {
    thread.user = req.user.id;

    if (!title || !content) {
      return res.status(401).json({ ok: false, message: "Todos los campos son obligatorios" });
    }

    const threadDB = await thread.save();

    if (!threadDB) {
      return res.status(400).json({ ok: false, message: "El Hilo ya existe" });
    }

    res.json({ ok: true, thread: threadDB });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};


const getThread = async(req, res) => {
    const { page = 1, limit = 10} = req.query;

    const options = {
    page,
    limit: parseInt(limit),
    sort: { created: 1 },
    populate: 'user',
  }

  
    const threads = await Thread.paginate({}, options);
    res.json({
        ok: true,
        threads
    });
}


const deleteThread = async(req, res) => {
    const threadId = req.params.id;
  
    try {
        const thread = await Thread.findById( threadId );
        if(!thread){
           return res.status(404).json({
                ok: false,
                message: 'Hilo no existe por ese id'
            });
        }

        await Thread.findByIdAndDelete( threadId );
        await Post.deleteMany({thread: threadId});
        res.json({ ok: true });

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}



const updateThread = async(req, res) => {
    const threadId = req.params.id;

    try {
        const thread = await Thread.findById( threadId );
        if(!thread){
           return res.status(404).json({
                ok: false,
                message: 'Hilo no existe por ese id'
            });
        }

        // Verifica que solo el usuario que creó el hilo pueda actualizarlo
        if(thread.user.toString() !== req.user.id){
            return res.status(401).json({
                ok: false,
                message: 'No tiene privilegios para editar este hilo'
            });
        }

        // En el body de la petición no viene el id del user
        const newThread = {
            ...req.body,
            user: req.user.id
        }

        // new : true es para que me devuelve el hilo con los datos actualizados
        const updateThread = await Thread.findByIdAndUpdate( threadId, newThread, { new: true });

        res.json({
            ok: true,
            thread: updateThread
        })
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }

}


const getThreadByUser = async(req, res) => {

    const userId = req.params.user;
    try {
        const threads = await Thread.find({user: userId});
        res.json({
            ok: true,
            threads
        });
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }

}


const getThreadById = async(req, res) => {

    const threadId = req.params.id;
    try {
        const thread = await Thread.findById(threadId).populate('user', 'name lastname avatar');
        res.json({
            ok: true,
            thread
        });
    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }

}


module.exports = {
    newThread,
    getThread,
    updateThread,
    deleteThread,
    getThreadByUser,
    getThreadById
}