import Post from "../models/post.js";
import Thread from "../models/thread.js";
import ErrorResponse from "../utils/errorResponse.js";

// @desc Agregar un nuevo hilo
// @route POST /api/threads
// @access Private
export const addThread = async (req, res, next) => {
  try {
    const thread = new Thread(req.body);
    const post = new Post(req.body);

    thread.user = req.id;

    const threadDB = await thread.save();
    if (!threadDB) return next(new ErrorResponse("El Hilo ya existe", 400));

    post.content = req.body.content;
    post.user = req.id;
    post.thread = threadDB._id;
    const postDB = await post.save();
    if (!postDB) return next(new ErrorResponse("El posteo no se pudo crear", 400));

    res.json({ ok: true, data: threadDB, message: 'Hilo agregado' });
  } catch (error) {
    next(error);
  }
};

// @desc Obtiene los hilos paginados
// @route GET /api/threads
// @access Public
export const getThread = async (req, res, next) => {
  const { page = 1, limit = 15, search = "", status, user } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: 1 },
    populate: [
      {
        path: "user",
        select: "name lastname",
      },
      {
        path: "posts",
        select: "date user",
        sort: { date: -1 },
        limit: 1,
        populate: { path: "user", select: "name lastname" },
      },
    ],
  };

  let filters = {};
  if (status) filters = { status };
  if (user) filters = { ...filters, user };

  try {
    if (search) {
      const threads = await Thread.paginate(
        {
          ...filters,
          title: { $regex: search, $options: "i" },
        },
        options
      );
      return res.json({ ok: true, data: threads.docs });
    }

    const threads = await Thread.paginate({ ...filters }, options);
    res.json({
      ok: true,
      data: threads.docs,
      totalPages: threads.totalPages,
      count: threads.totalDocs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Obtiene un hilo
// @route GET /api/thread/:threadId
// @access Public
export const getThreadById = async (req, res, next) => {
    const { threadId } = req.params;
  
    try {
      const thread = await Thread.findById(threadId)
        .populate('user', 'name lastname');
      if (!thread) return next(new ErrorResponse('No existe el hilo', 404));
  
      return res.json({ ok: true, data: thread });
    } catch (error) {
      next(error);
    }
  };

// @desc Actualiza un hilo
// @route PUT /api/threads/:threadId
// @access Private
export const updateThread = async (req, res, next) => {
    const { threadId } = req.params;
  
    try {
      const thread = await Thread.findById(threadId);
      if (!thread) return next(new ErrorResponse('No existe el hilo', 404));
  
      // Verifica que solo el usuario que creó el hilo pueda actualizarlo
      if (thread.user.toString() !== req.id)
        return next(
          new ErrorResponse("No tiene privilegios para editar este hilo", 401)
        );
  
      const newThread = {
        ...req.body,
        user: req.id,
        date: Date.now(),
        isUpdated: true
      };
  
      const updateThread = await Thread.findByIdAndUpdate(threadId, newThread, {
        new: true,
      });
  
      res.json({
        ok: true,
        thread: updateThread,
        message: 'Hilo actualizado'
      });
    } catch (error) {
      next(error);
    }
};

// @desc Elimina un hilo
// @route DELETE /api/threads/threadId
// @access Private
export const deleteThread = async (req, res, next) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findById(threadId);
    if (!thread) return next(new ErrorResponse("No existe el hilo", 404));

    await Thread.findByIdAndDelete(threadId);
    await Post.deleteMany({ thread: threadId });
    res.json({ ok: true, data: threadId, message: 'Hilo eliminado' });
  } catch (error) {
    next(error);
  }
};