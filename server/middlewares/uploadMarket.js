const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    // 1 Mb
    limits: { fileSize: 1 * 1000 * 1000 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "../../uploads/markets");
      },
      filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        cb(null, `${shortid.generate()}.${extension}`);
      },
    })),
    fileFilter(req, file, cb) {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb(new Error("La extension de la imagen no es válida. (Extensiones permitidas: .png y .jpg)"));
      }
    },
  };
  
  // pasar la configuración y el campo
  const upload = multer(configuracionMulter).single('picture');
  
  // Sube un archivo 
  exports.subirArchivo = (req, res, next) => {
      upload(req, res, function(error) {
          if(error) {
              if(error instanceof multer.MulterError){
                  if(error.code === 'LIMIT_FILE_SIZE') {
                     return res.status(404).json({ ok: false, message: 'La imagen es muy grande. Límite de 1 MB'});
                  } else {
                   return res.status(404).json({ ok: false, message: error.message});
                  }
              } else if(error.hasOwnProperty('message')) {
                return res.status(404).json({ ok: false, message: error.message});
              } 
          }
          return next();
      })
  }