import Notice from "../models/notice.js";
import ErrorResponse from "../utils/errorResponse.js";
import { fsUnlink } from "../utils/fsUnlink.js";

const pathUploadNotices = "/notices";

// @desc Obtener las noticias paginadas
// @route /api/notices
// @access Public
export const getNotices = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    title,
    visible,
    sortField,
    sortOrder,
  } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { name: 1 },
  };

  if (sortField) options.sort = { [sortField]: sortOrder || 1 };

  const filters = {};
  if (visible) filters.visible = +visible;
  if (title) filters.title = { $regex: title, $options: "i" };

  try {
    const notices = await Notice.paginate(filters, options);
    res.json({
      notices: notices.docs,
      totalPages: notices.totalPages,
      count: notices.totalDocs,
    });
  } catch (error) {
    console.log({ error });
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
    if (!notice) throw new ErrorResponse("No existe la noticia", 404);

    return res.json({ notice });
  } catch (error) {
    next(error);
  }
};

// @desc Agregar una nuevo noticia
// @route /api/notices
// @access Private
export const addNotice = async (req, res, next) => {
  try {
    if (!req.file)
      throw new ErrorResponse("Debe subir la foto de la noticia", 400);

    req.body.image = req.file.filename;

    const newNotice = new Notice(req.body);
    const savedNotice = await newNotice.save();

    res.json({ notice: savedNotice, message: "Noticia creada" });
  } catch (error) {
    if (req.file) fsUnlink(`${pathUploadNotices}/${req.file.filename}`);
    console.log(error);
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
    if (!notice) throw new ErrorResponse("La noticia no existe", 404);

    if (req.file) {
      req.body.image = req.file.filename;
      try {
        fsUnlink(`${pathUploadNotices}/${notice.image}`);
      } catch (error) {
        console.log(error);
      }
    }

    const noticeUpdated = await Notice.findByIdAndUpdate(noticeId, req.body, {
      new: true,
    });

    res.json({
      notice: noticeUpdated,
      message: "Noticia actualizada",
    });
  } catch (error) {
    if (req.file) fsUnlink(`${pathUploadNotices}/${req.file.filename}`);
    console.log(error);
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
    if (!notice) throw new ErrorResponse("La noticia no existe", 404);

    await Notice.findByIdAndDelete(noticeId);

    try {
      fsUnlink(`${pathUploadNotices}/${notice.image}`);
    } catch (error) {
      console.log(error);
    }

    res.json({ noticeId, message: "Noticia eliminada" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
