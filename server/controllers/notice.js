import Notice from "../models/notice.js";
import ErrorResponse from "../utils/errorResponse.js";
import { fsUnlink } from "../utils/fsUnlink.js";


// @desc Agregar una nuevo noticia
// @route /api/notices
// @access Private
export const addNotice = async (req, res, next) => {
  try {
    const { title, link } = req.body;
    const imageBuffer = req.file.buffer;
    // Guardar la noticia en MongoDB junto con el buffer de la imagen
    const newNotice = new Notice({
      title,
      link,
      avatar: {
        data: imageBuffer,
        contentType: req.file.mimetype,
      },
    });

    // Liberar memoria
    req.file.buffer = null;

    await newNotice.save();

    res.json({ ok: true, data: newNotice, message: "Noticia creada" });


    // if (req.file) //req.body.image = req.file.filename;
    // return res.json({ file: req.file })
    // const notice = await Notice.create(req.body);
    // res.json({ ok: true, data: notice, message: "Noticia creada" });
  } catch (error) {
    console.log(error)
    if (req.file) fsUnlink(`/notices/${req.file.filename}`);
    next(error);
  }
};


// @desc Obtener las noticias paginadas
// @route /api/notices
// @access Public
export const getNotices = async (req, res, next) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  try {
    if (search) {
      const notices = await Notice.paginate(
        {
          title: { $regex: search, $options: "i" },
        },
        options
      );

      return res.json({ ok: true, data: notices.docs });
    }

    const notices = await Notice.paginate({}, options);
    res.json({
      ok: true,
      data: notices.docs,
      totalPages: notices.totalPages,
      count: notices.totalDocs,
    });
  } catch (error) {
    next(error);
  }
};


// @desc Obtener una noticia
// @route /api/notices/:noticeId
// @access Private
export const getNoticeById = async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notice = await Notice.findById({ _id: noticeId });
    if (!notice) return next(new ErrorResponse("No existe la noticia", 404));

    return res.json({ ok: true, data: notice });
  } catch (error) {
    next(error);
  }
};


// @desc Actualizar una noticia
// @route /api/notices/:noticeId
// @access Private
export const updateNotice = async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notice = await Notice.findById(noticeId);
    if (!notice) return next(new ErrorResponse("La noticia no existe"));

    if (req.file) {
      // req.body.avatar = req.file.filename;

      req.body.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
      // fsUnlink(`/notices/${notice.image}`);
    }

    const noticeUpdated = await Notice.findByIdAndUpdate(noticeId, req.body, {
      new: true,
    });

    res.json({
      ok: true,
      data: noticeUpdated,
      message: "Noticia actualizada",
    });
  } catch (error) {
    if (req.file) fsUnlink(`/notices/${req.file.filename}`);
    next(error);
  }
};


// @desc Eliminar una noticia
// @route /api/notices/:noticeId
// @access Private
export const deleteNotice = async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notice = await Notice.findById(noticeId);
    if (!notice) return next(new ErrorResponse('La noticia no existe'));

    await Notice.findByIdAndDelete(noticeId);

    if (notice.image) fsUnlink(`/notices/${notice.image}`);

    res.json({ ok: true, data: noticeId, message: 'Noticia eliminada' });
  } catch (error) {
    next(error);
  }
};
