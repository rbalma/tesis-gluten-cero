import multer from 'multer';
import shortid from 'shortid';
import ErrorResponse from '../utils/errorResponse.js';
import __dirname from '../dirnamePath.js';

const pathUploadAvatar = __dirname + '/uploads/avatar';
const pathUploadNotices = __dirname + '/uploads/notices';
// if ( process.env.NODE_ENV === 'production')  pathUpload = __dirname+'/uploads/avatar';

const configuracionMulter = {
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
  // storage: multer.diskStorage({
  storage: multer.memoryStorage({
    destination: (req, file, cb) => {
      const pathUpload = req.body.title ? pathUploadNotices : pathUploadAvatar;
      cb(null, pathUpload);
    },
    filename: (req, file, cb) => {
      const { name, lastname } = req.user;
      const extension = file.mimetype.split('/')[1];
      const nameFile = req.body.title
        ? `${shortid.generate()}.${extension}`
        : `${name}_${lastname}-${shortid.generate()}.${extension}`;
      cb(null, nameFile);
    },
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      return cb(
        new Error(
          'La extension de la imagen no es válida. (Extensiones permitidas: .png y .jpg'
        )
      );
    }
  },
};

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('avatar');

// Sube la imagen al server
export const uploadFile = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return next(
            new ErrorResponse('La imagen es muy grande. Límite de 1 MB', 404)
          );
        } else {
          return next(new ErrorResponse(error.message, 404));
        }
      }
      if (error.hasOwnProperty('message'))
        return next(new ErrorResponse(error.message, 404));
    }
    return next();
  });
};
