const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    if(err.code === 11000) {
        const message = `Ya se encuentra registrado: ${JSON.stringify( error.keyValue ) }`;
        error = new ErrorResponse(message, 400);
    }

    if(err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        ok: false,
        message: error.message || "Error del servidor"
    });
}


module.exports = errorHandler;