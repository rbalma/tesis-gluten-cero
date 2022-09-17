const { URL_RESET_PASS, JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../services/sendEmail');
const { googleVerify } = require('../services/google-verify');

// @desc Autenticación
// @route /api/login
// @access Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorResponse('Debe ingresar un correo y una contraseña'));

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return next(new ErrorResponse('El correo ingresado no es válido', 401));

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return next(new ErrorResponse('La contraseña es incorrecta', 401));

    if (!user.active)
      return next(new ErrorResponse('El usuario está inactivo', 401));

    const payload = {
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      active: user.active,
      avatar: user.avatar,
      dicebear: user.dicebear,
      userGoogle: user.google,
      favRecipes: user.favRecipes,
    };

    const token = user.getSignedJwtToken(payload);

    res.json({
      ok: true,
      data: { user: payload, token },
    });
  } catch (error) {
    next(error);
  }
};


// @desc Renovar token
// @route /api/refresh-token
// @access Private
exports.renewToken = (req, res) => {
  const { user } = req;
  // Generar Nuevo Token
  const token = jwt.sign( user, JWT_SECRET, { expiresIn: '1d'} );
  res.json({ ok: true, data: { user, token } });
};


// @desc Autenticación con Google
// @route /api/login-google
// @access Public
exports.googleSignIn = async (req, res, next) => {
  const { id_token } = req.body;

  try {
    const { given_name, family_name, picture, email } = await googleVerify(
      id_token
    );

    let user = await User.findOne({ email });

    let data = {
      name: given_name,
      lastname: family_name,
      email,
      avatarUrl: picture,
      google: true,
    };

    if (!user) {
      //Tengo que crearlo
      data = {
        ...data,
        password: 'XD**********',
      };
      user = new User(data);
      await user.save();
    } else {
      if (!user.google) {
        //El usuario se registró en gluten cero.
        //opcional: actualizar sus datos ->
        user = await User.findByIdAndUpdate(user._id, data, { new: true });
        //return res.status(401).json({ ok: false, message: 'El usuario ya está registrado. Use el logueo de GLuten Cero'});
      }
    }

    // Si user active es false
    if (!user.active)
      return next(new ErrorResponse('¡Usuario Bloqueado!', 401));

    // Generar el JWT
    const token = user.getSignedJwtToken(payload);

    res.json({ ok: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};


// @desc Envio de correo para modificar la contraseña
// @route /api/forgot-password
// @access Public
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorResponse('El correo no está registrado en el sistema', 404));

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${URL_RESET_PASS}/cambiar-password/${resetToken}`;

    const message = `
      <h1 style='
      text-align: center;
      font-family: Arial, Helvetica;
      '>Confirmar tu Cuenta</h1>
      <p style='font-family: Arial, Helvetica;'>Usted ha solicitado un cambio de contraseña. Tiene diez minutos para realizar el cambio ingresando al siguiente enlace: </p>
      <a style='
      display: block;
      font-family: Arial, Helvetica;
      padding: 1rem;
      background-color: #00C897;
      color: white;
      text-transform: uppercase;
      text-align: center;
      text-decoration: none;
      'href=${resetUrl}>Cambiar contraseña</a>
      <p style='font-family: Arial, Helvetica;'>Sino puedes acceder a este enlace, vísita : ${resetUrl}</p>
      <p style='font-family: Arial, Helvetica;'>Si no solicitaste este e-mail puedes ignorarlo</p>
    `;

    try {
      const result = await sendEmail({
        to: user.email,
        subject: 'Pedido de cambio de contraseña',
        text: message,
      });

      if(result) return res.json({ data: true, message: 'Correo enviado' });
      
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse('El correo no pudo ser enviado', 500));
    }
  } catch (error) {
    next(error);
  }
};


// @desc Modificar contraseña
// @route /api/reset-password/:resetToken
// @access Private
exports.resetPassword = async (req, res, next) => {
    
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
      data: true,
      message: "Contraseña actualizada",
    });
  } catch (err) {
    next(err);
  }
};
