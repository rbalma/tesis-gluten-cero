const XLSX = require('xlsx');
const multer = require('multer');
const ErrorResponse = require('../utils/errorResponse');

//* Configuración Multer
const pathUpload = __dirname + '../../docs';
const configuracionMulter = {
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, pathUpload);
    },
    filename: (req, file, cb) => {
      const extension = 'xlsx';
      cb(null, `listado-anmat.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (
      file.mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      cb(null, true);
    } else {
      cb(new Error('La extension no es válida. (Extensión permitida: xlsx)'));
    }
  },
};

const upload = multer(configuracionMulter).single('file');


// @desc Obtener el listado de productos aprobados por ANMAT
// @route /api/products-anmat
// @access Public
exports.getProducts = (req, res, error) => {
  try {
    const workbook = XLSX.readFile('./docs/listado-anmat.xlsx');
    //const workbookSheets = workbook.SheetNames;
    const dataExcel = XLSX.utils.sheet_to_json(
      workbook.Sheets['Resumen Productos']
    );
    res.json({ ok: true, data: dataExcel, count: dataExcel.length });
  } catch (error) {
    next(error);
  }
};


// @desc Cargar archivo excel que contiene el listado de productos aprobados por ANMAT
// @route /api/products-anmat
// @access Private
exports.addFileExcel = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return next(
            new ErrorResponse('El archivo es muy grande. Límite de 1 MB', 500)
          );
        } else {
          return next(new ErrorResponse(error.message, 404));
        }
      }

      if (error.hasOwnProperty('message')) {
        return next(new ErrorResponse(error.message, 404));
      }
    }

    res.json({ ok: true, message: 'Archivo Excel guardado' });
  });
};
