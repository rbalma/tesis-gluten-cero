import { URL_FRONT } from "../config/config.js";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";
import { fsUnlink } from "../utils/fsUnlink.js";
import sendEmail from "../services/sendEmail.js";

// @desc Obtener los usuarios paginados
// @route /api/users
// @access Private
export const getUsers = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    name,
    lastname,
    email,
    role,
    sortField,
    sortOrder,
    active,
  } = req.query;

  const records = [
    "_id",
    "name",
    "lastname",
    "email",
    "role",
    "avatar",
    "active",
    "createdAt",
    "google",
  ];

  const options = {
    page,
    limit: parseInt(limit),
    sort: { createdAt: -1 },
    select: records,
  };

  if (sortField) options.sort = { [sortField]: sortOrder || 1 };

  const filters = {};
  if (active) filters.active = +active;
  if (role) filters.role = role;
  if (name) filters.name = { $regex: name, $options: "i" };
  if (lastname) filters.lastname = { $regex: lastname, $options: "i" };
  if (email) filters.email = { $regex: email, $options: "i" };

  try {
    const users = await User.paginate(filters, options);
    res.json({
      data: users.docs,
      totalPages: users.totalPages,
      count: users.totalDocs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Obtener un usuario
// @route /api/users/:id
// @access Private
export const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) throw new ErrorResponse("No existe el usuario", 404);

    return res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

// @desc Agregar un nuevo usuario
// @route /api/users
// @access Public
export const addUsers = async (req, res, next) => {
  const { name, lastname, email, password, role, active } = req.body;

  try {
    const newUser = {
      name,
      lastname,
      email,
      password,
      role,
      active,
    };

    const user = await User.create(newUser);

    const confirmUrl = `${URL_FRONT}/ingreso?q=${user._id}`;

    const message = `
    <h1 style='
    text-align: center;
    font-family: Arial, Helvetica;
    '>Confirma tu Cuenta</h1>
    <p style='font-family: Arial, Helvetica; text-align: center;'>Ya estás a un solo paso de convertirte en miembro de Gluten Cero. Solo debes
      presionar el siguiente botón: </p>
    <a style='
    display: flex;
    font-family: Arial, Helvetica;
    padding: 1rem;
    background-color: #00C897;
    color: white;
    margin: 10px auto;
    text-transform: uppercase;
    text-align: center;
    text-decoration: none;
    width: max-content;
    ' href=${confirmUrl}>Confirmar cuenta</a>
    <p style='font-family: Arial, Helvetica; text-align: center;'>Si no puedes acceder a este enlace, vísita : ${confirmUrl}</p>
    `;

    try {
      const result = await sendEmail({
        to: email,
        subject: "Activar cuenta de Gluten Cero",
        text: message,
      });

      if (result)
        return res.status(201).json({
          data: user,
          message: "Usuario creado y correo enviado",
        });
    } catch (error) {
      return next(new ErrorResponse("El correo no pudo ser enviado", 500));
    }
  } catch (error) {
    next(error);
  }
};

// @desc Agregar un nuevo usuario desde el panel administrador
// @route /api/admin/users
// @access Private
export const addUserPanelAdmin = async (req, res, next) => {
  try {

    if (req.file) {
      req.body.avatar = req.file.filename;
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.json({ user: savedUser, message: "Usuario agregado"  });
  } catch (error) {
    if (req.file) fsUnlink(`/avatar/${req.file.filename}`);
    console.log(error);
    next(error);
  }
};

// @desc Activar la cuenta de un usuario registrado
// @route /api/active-account/:userId
// @access Private
export const activeUserAccount = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) return next(new ErrorResponse("No existe el usuario", 404));

    user.active = 1;
    await user.save();

    res.json({
      message: "Cuenta activada",
    });
  } catch (error) {
    next(error);
  }
};

// @desc Actualizar un usuario
// @route /api/users/:userId
// @access Private
export const updateUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return next(new ErrorResponse("El usuario no existe", 404));

    if (req.file) {
      req.body.avatar = req.file.filename;
      user.avatar && fsUnlink(`/avatar/${user.avatar}`);
    }

    if (req.file && !user.avatar.startsWith("http")) {
      try {
        fsUnlink(`/avatar/${user.avatar}`);
      } catch (error) {
        console.log(error);
      }
    }

    if (req.body?.password) {
      req.body.password = await user.newPassword(req.body.password);
    }

    const userUpdated = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.json({
      data: userUpdated,
      message: "Usuario actualizado",
    });
  } catch (error) {
    if (req.file) fsUnlink(`/avatar/${req.file.filename}`);
    console.log(error);
    next(error);
  }
};

// @desc Eliminar un usuario
// @route /api/users/:id
// @access Private
export const deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) throw new ErrorResponse("El usuario no existe", 404);

    await User.findByIdAndDelete(userId);

    if (!user.avatar.startsWith("http")) {
      try {
        fsUnlink(`/avatar/${user.avatar}`);
      } catch (error) {
        console.log(error);
      }
    }

    res.json({ data: userId, message: "Usuario eliminado" });
  } catch (error) {
    next(error);
  }
};

// @desc Obtiene el detalle de los marcadores favoritos de un usuario
// @route /api/fav-markets/:userId
// @access Private
export const getFavMarkets = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const favMarkets = await User.findById(userId).select("_id").populate({
      path: "favMarkets",
      select: "name type image",
    });
    if (!favMarkets) return next(new ErrorResponse("El usuario no existe"));

    res.json({ ok: true, data: favMarkets, count: favMarkets.length });
  } catch (error) {
    next(error);
  }
};

// @desc agrega un marcador como favorito de un usuario
// @route /api/fav-markets/:userId
// @access Private
export const addFavMarkets = async (req, res, next) => {
  const { userId } = req.params;
  const { marketId } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { $push: { favMarkets: marketId } });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};

// @desc elimina un marcador como favorito de un usuario
// @route /api/fav-markets/:userId
// @access Private
export const deleteFavMarkets = async (req, res, next) => {
  const { userId } = req.params;
  const { marketId } = req.query;

  try {
    await User.findByIdAndUpdate(userId, { $pull: { favMarkets: marketId } });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};
