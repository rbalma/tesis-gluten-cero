import multer from "multer";
import shortid from "shortid";
import ErrorResponse from "../utils/errorResponse.js";
import __dirname from "../dirnamePath.js";

const pathUploadCategory = __dirname + "/uploads/categories";
const pathUploadNotice = __dirname + "/uploads/notices";
const pathUploadAvatar = __dirname+'/uploads/avatar';

const configuracionMulter = {
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.body?.email) return cb(null, pathUploadAvatar);
      const pathUpload = req.body.title ? pathUploadNotice : pathUploadCategory;
      cb(null, pathUpload);
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      const nameFile = `${shortid.generate()}.${extension}`;
      cb(null, nameFile);
    },
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      return cb(
        new Error(
          "La extension de la imagen no es válida. (Extensiones permitidas: .png y .jpg"
        )
      );
    }
  },
};

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single("image");

// Sube la imagen a la carpeta upload del server
export const uploadFile = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return next(
            new ErrorResponse("La imagen es muy grande. Límite de 2 MB", 404)
          );
        } else {
          return next(new ErrorResponse(error.message, 404));
        }
      }
      if (error.hasOwnProperty("message"))
        return next(new ErrorResponse(error.message, 404));
    }
    return next();
  });
};
