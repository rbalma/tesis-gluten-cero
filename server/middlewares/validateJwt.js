import { config } from "dotenv";
config();
import { JWT_SECRET } from '../config/config.js';
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";

export const validateJWT = (req, res, next) => {
  const hayToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ;

  try {
    if (!hayToken) return next(new ErrorResponse('No hay token en la petición', 401));
 
    const token = req.headers.authorization.split(" ")[1];
    const { user } = jwt.verify(token, JWT_SECRET);

    req.id = user.id;
    req.user = user;

  } catch (error) {
    return next(new ErrorResponse('Token no válido', 401));
  }

  next();
};
