import { URL_FRONT, JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../services/sendEmail.js";
import { googleVerify } from "../services/google-verify.js";
import handlebars from "handlebars";
import fs from "fs";
import dirnamePath from "../dirnamePath.js";

// @desc Autenticación
// @route /api/login
// @access Public
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse("Debe ingresar un correo y una contraseña"));

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return next(new ErrorResponse("El correo ingresado no es válido", 401));

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return next(new ErrorResponse("La contraseña es incorrecta", 401));

    if (!user.active)
      return next(new ErrorResponse("La cuenta está inactiva", 401));

    const payload = {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      active: user.active,
      avatar: user.avatar,
      userGoogle: user.google,
      favRecipes: user.favRecipes,
      favMarkers: user.favMarkers,
      favProducts: user.favProducts,
    };

    const token = user.getSignedJwtToken(payload);

    res.json({
      ok: true,
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Renovar token
// @route /api/refresh-token
// @access Private
export const renewToken = (req, res) => {
  const { user } = req;
  // Generar Nuevo Token
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ ok: true, user, token });
};

// @desc Autenticación con Google
// @route /api/login-google
// @access Public
export const googleSignIn = async (req, res, next) => {
  const { code } = req.body;

  try {
    const { given_name, family_name, picture, email } = await googleVerify(
      code
    );

    let user = await User.findOne({ email });

    let data = {
      name: given_name,
      lastname: family_name,
      email,
      avatar: picture,
      google: true,
      active: true,
    };

    if (!user) {
      //Tengo que crearlo
      data = {
        ...data,
        password: "XD**********??t23",
      };
      user = new User(data);
      await user.save();
    } else {
      if (!user.google) {
        //El usuario se registró en gluten cero.
        //opcional: actualizar sus datos ->
        // user = await User.findByIdAndUpdate(user._id, data, { new: true });
        return next(
          new ErrorResponse(
            "El usuario ya está registrado. Ingrese con su correo a Gluten Cero",
            401
          )
        );
      }
    }

    // Si user active es false
    if (!user.active)
      return next(new ErrorResponse("El usuario está inactivo", 401));

    // Generar el JWT
    const payload = {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      active: user.active,
      avatar: user.avatar,
      userGoogle: user.google,
      favRecipes: user.favRecipes,
    };

    const token = user.getSignedJwtToken(payload);

    res.json({ ok: true, user: payload, token });
  } catch (error) {
    next(error);
  }
};

// @desc Envio de correo para modificar la contraseña
// @route /api/forgot-password
// @access Public
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return next(
        new ErrorResponse("El correo no está registrado en el sistema", 404)
      );

    const resetToken = user.getResetPasswordToken();

    await user.save();

    try {
      fs.readFile(
        dirnamePath + "/utils/templatesMails/forgotPassword.html",
        { encoding: "utf-8" },
        async function (err, html) {
          if (err) {
            throw new Error(err);
          } else {
            const template = handlebars.compile(html);
            const replacements = {
              url: `${URL_FRONT}`,
              resetToken: resetToken,
            };
            const htmlToSend = template(replacements);
            const result = await sendEmail({
              to: user.email,
              subject: "Pedido de cambio de contraseña",
              text: htmlToSend,
            });
            if (result)
              return res.json({ ok: true, message: "Correo enviado" });
          }
        }
      );
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("El correo no pudo ser enviado", 500));
    }
  } catch (error) {
    next(error);
  }
};

// @desc Modificar contraseña
// @route /api/reset-password/:resetToken
// @access Private
export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // >=
    });

    if (!user) return next(new ErrorResponse("El enlace ha expirado", 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      ok: true,
      message: "Contraseña actualizada",
    });
  } catch (err) {
    next(err);
  }
};
