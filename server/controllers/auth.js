const jwt = require("../services/jwt");
const moment = require("moment");
const User = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const { googleVerify } = require("../services/google-verify");
const user = require("../models/user");

function willExpireToken(token) {
  const { exp } = jwt.decodedToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }
  return false;
}


function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  const isTokenExpired = willExpireToken(refreshToken);

  if (isTokenExpired) {
    res.status(404).send({ message: "El refreshToken ha expirado" });
  } else {
    const { id } = jwt.decodedToken(refreshToken);

    User.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!userStored) {
          res.status(404).send({ message: "Usuario no encontrado." });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccessToken(userStored),
            refreshToken: refreshToken
          });
        }
      }
    });
  }
}



const login = async(req, res, next) => {
  const { email, password } = req.body;
  const mail = email.toLowerCase();

  if(!mail || !password){
    //return res.status(400).json({ ok: false, message: 'Debe ingresar un correo y una contraseña'});
    return next(new ErrorResponse('Debe ingresar un correo y una contraseña'));
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if(!user){
     //return res.status(404).json({ ok: false, message: 'El correo ingresado no es válido'});
     return next(new ErrorResponse('El correo ingresado no es válido', 401));
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch){
     //return res.status(404).json({ ok: false, message: 'La contraseña es incorrecta'});
     return next(new ErrorResponse('La contraseña es incorrecta', 401));
    }

    if(!user.active) {
     //return res.status(401).json({ ok: false, message: "El usuario está bloqueado" });
     return next(new ErrorResponse('El usuario está bloqueado', 401));
    }

    res.status(200).json({ ok: true, accessToken: jwt.createAccessToken(user),
      refreshToken: jwt.createRefreshToken(user) });

  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });  
  }

}




const googleSignIn = async(req, res) => {
  const { id_token } = req.body;

  try {
      const { given_name, family_name, picture, email } = await googleVerify( id_token );

      let user = await User.findOne({ email: email.toLowerCase() });

      let data = {
        name: given_name, 
        lastname: family_name,
        email,
        avatarUrl: picture,
        google: true
    };

      if(!user){
          //Tengo que crearlo
          data = {
            ...data,
            password: 'XD**********'
          }
          user = new User( data );
          await user.save();
      }else {
          if(!user.google){
           //El usuario se registró en gluten cero. 
          //opcional: actualizar sus datos -> 
          user = await User.findByIdAndUpdate(user._id, data, { new: true });
          //return res.status(401).json({ ok: false, message: 'El usuario ya está registrado. Use el logueo de GLuten Cero'});
        }
      }

      

      // Si user active es false
      if(!user.active){
          return res.status(401).json({ ok: false, message: '¡Usuario Bloqueado!' });
      }

      // Generar el JWT
      const accessToken = jwt.createAccessToken( user );
      const refreshToken = jwt.createRefreshToken( user ); 

      res.json({ ok: true, user, accessToken, refreshToken });
      
  } catch (error) {
      res.status(400).json({ ok: false, message: 'El token no se pudo verificar', error: error.message });
  }

}



const forgotPassword = async(req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if(!user){
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
      <h1 style="
      text-align: center;
      font-family: Arial, Helvetica;
      ">Confirmar tu Cuenta</h1>
      <p style="font-family: Arial, Helvetica;">Usted ha solicitado un cambio de contraseña. Por favor visita el siguiente enlace para hacerlo: </p>
      <a style="
      display: block;
      font-family: Arial, Helvetica;
      padding: 1rem;
      background-color: #00C897;
      color: white;
      text-transform: uppercase;
      text-align: center;
      text-decoration: none;
      "href=${resetUrl}>Cambiar contraseña</a>
      <p style="font-family: Arial, Helvetica;">Sino puedes acceder a este enlace, vísita : ${resetUrl}</p>
      <p style="font-family: Arial, Helvetica;">Si no solicitaste este e-mail puedes ignorarlo</p>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Cambio de contraseña",
        text: message
      });

      res.status(200).json({ success: true, data: "Correo Enviado"});
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse('El correo no pudo ser enviado', 500));
    }

  } catch (error) {
    next(error);
  }

}




const resetPassword = async(req, res, next) => {

  res.send('reset password route');
}



module.exports = {
  login,
  refreshAccessToken,
  googleSignIn,
  forgotPassword,
  resetPassword
};
