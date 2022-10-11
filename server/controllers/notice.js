const Notice = require("../models/Notice");
const ErrorResponse = require("../utils/errorResponse");
const { fsUnlink } = require("../utils/fsUnlink");


// @desc Agregar una nuevo noticia
// @route /api/notices
// @access Private
exports.addNotice = async (req, res, next) => {
  try {
    if (req.file) //req.body.image = req.file.filename;
    return res.json({ file: req.file })
    const notice = await Notice.create(req.body);
    res.json({ ok: true, data: notice, message: "Noticia creada" });
  } catch (error) {
    if (req.file) fsUnlink(`/notices/${req.file.filename}`);
    next(error);
  }
};


// @desc Obtener las noticias paginadas
// @route /api/notices
// @access Public
exports.getNotices = async (req, res, next) => {
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
exports.getNoticeById = async (req, res, next) => {
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
exports.updateNotice = async (req, res, next) => {
  const { noticeId } = req.params;

  try {
    const notice = await Notice.findById(noticeId);
    if (!notice) return next(new ErrorResponse("La noticia no existe"));

    if (req.file) {
      req.body.image = req.file.filename;
      fsUnlink(`/notices/${notice.image}`);
    }

    const noticeUpdated = await Notice.findByIdAndUpdate(id, req.body, {
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
exports.deleteNotice = async (req, res, next) => {
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
