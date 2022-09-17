const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const { fsUnlink } = require("../utils/fsUnlink");


// @desc Agregar un nuevo usuario
// @route /users
// @access Public
exports.addUsers = async (req, res, next) => {
  const { name, lastname, email, password, role = "user" } = req.body;

  try {
    const newUser = {
      name,
      lastname,
      email,
      password,
      role,
    };

    const user = await User.create(newUser);

    return res
      .status(201)
      .json({ ok: true, data: user, message: "Usuario creado" });
  } catch (error) {
    next(error);
  }
};


// @desc Obtener un usuario
// @route /users/:id
// @access Private
exports.getUserById = async (req, res, next) => {
  const params = req.params;

  try {
    const user = await User.findById({ _id: params.id });
    if (!user) return next(new ErrorResponse("No existe el usuario", 404));

    return res.json({ ok: true, data: user });
  } catch (error) {
    next(error);
  }
};


// @desc Obtener los usuarios paginados
// @route /users
// @access Private
exports.getUsers = async (req, res, next) => {
  const { page = 1, limit = 15, search = "", active } = req.query;

  const records = [
    "_id",
    "name",
    "lastname",
    "email",
    "role",
    "avatar",
    "active",
    "avatar",
    "dicebear",
  ];

  const options = {
    page,
    limit: parseInt(limit),
    select: records,
  };

  let filters = {};
  if (active) filters = { active };

  try {
    if (search) {
      const users = await User.paginate(
        {
          ...filters,
          $or: [
            { name: { $regex: search, $options: "i" } },
            { lastname: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        },
        options
      );
      return res.json({ ok: true, data: users.docs });
    }

    const users = await User.paginate({ ...filters }, options);
    res.json({
      ok: true,
      data: users.docs,
      totalPages: users.totalPages,
      count: users.totalDocs,
    });
  } catch (error) {
    next(error);
  }
};


// @desc Actualizar un usuario
// @route /users/:id
// @access Private
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return next(new ErrorResponse("El usuario no existe"));

    if (req.file) {
      req.body.avatar = req.file.filename;
      user.avatar && fsUnlink(user.avatar);
    }

    if (req.body?.password) {
      req.body.password = await user.newPassword(req.body.password);
    }

    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      ok: true,
      data: userUpdated,
      message: "Usuario actualizado",
    });
  } catch (error) {
    if (req.file) fsUnlink(req.file.filename);
    next(error);
  }
};


// @desc Eliminar un usuario
// @route /users/:id
// @access Private
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return next(new ErrorResponse("El usuario no existe"));

    await User.findByIdAndDelete(id);

    if (user.avatar) fsUnlink(user.avatar);

    res.json({ ok: true, data: id, message: "Usuario eliminado" });
  } catch (error) {
    next(error);
  }
};


// @desc Obtiene el detalle de las recetas favoritas de un usuario
// @route /fav-recipes/:userId
// @access Private
exports.getFavRecipes = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('_id').populate({
      path: "favRecipes",
      select: "title category image",
    });

    if (!user) return next(new ErrorResponse("El usuario no existe"));

    res.json({ ok: true, data: user, count: user.length });
  } catch (error) {
    next(error);
  }
};


// @desc agrega una receta como favorita de un usuario
// @route /fav-recipes/:userId
// @access Private
exports.addFavRecipe = async (req, res, next) => {
  const { userId } = req.params;
  const { recipeId } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { $push: { favRecipes: recipeId } });

    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};


// @desc elimina una receta como favorita de un usuario
// @route /fav-recipes/:userId
// @access Private
exports.deleteFavRecipe = async (req, res, next) => {
  const { userId } = req.params;
  const { recipeId } = req.query;

  try {
    await User.findByIdAndUpdate(userId, { $pull: { favRecipes: recipeId } });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};
