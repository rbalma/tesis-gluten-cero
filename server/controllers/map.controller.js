import mongoose from "mongoose";
import fs from "fs-extra";
import Marker from "../models/marker.js";
import User from "../models/user.js";
import ErrorResponse from "../utils/errorResponse.js";
import { uploadImage, deleteImage } from "../services/cloudinary.js";


// @desc Filtrar y paginar los marcadores.
// @route GET /api/markers
// @access Private
export const getMarkers = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    name,
    active,
    categoriesIds,
    userName,
    userId,
    sortField,
    sortOrder,
  } = req.query;

  try {
    const options = {
      page,
      limit: parseInt(limit),
      sort: { createdAt: 1 },
      populate: [
        {
          path: "user",
          select: "name lastname",
        },
        {
          path: "category",
          select: "name",
        },
      ],
    };

    if (sortField) options.sort = { [sortField]: sortOrder || 1 };

    const filters = {};
    if (active) filters.active = +active;
    if (name) filters.name = { $regex: name, $options: "i" };
    if (categoriesIds) filters.category = { $in: categoriesIds };
    if (userId) filters.user = userId;
    if (userName) {
      const users = await User.find(
        {
          $or: [
            { name: { $regex: userName, $options: "i" } },
            { lastname: { $regex: userName, $options: "i" } },
          ],
        },
        "_id"
      );
      if (users.length) filters.user = { $in: users.map((user) => user._id) };
    }

    const markers = await Marker.paginate(filters, options);

    res.json({
      data: markers.docs,
      totalPages: markers.totalPages,
      count: markers.totalDocs,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc Permite obtener los marcadores cercanos a una ubicación.
// @route GET /api/location/markers
// @access Public
export const getMarkersByLocation = async (req, res, next) => {
  const {
    limit = 15,
    name,
    active,
    categoriesIds,
    userName,
    userId,
    latitude,
    longitude,
    meters = 1000,
  } = req.query;

  try {
    const options = {
      limit: parseInt(limit),
      populate: [
        {
          path: "user",
          select: "name lastname",
        },
        {
          path: "category",
          select: "name",
        },
      ],
    };

    const filters = {};
    if (active) filters.active = +active;
    if (name) filters.name = { $regex: name, $options: "i" };
    if (categoriesIds) filters.category = { $in: categoriesIds };
    if (userId) filters.user = userId;
    if (latitude && longitude)
      filters.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
        },
      };
    if (meters) filters.location.$near.$maxDistance = parseInt(meters);

    if (userName) {
      const users = await User.find(
        {
          $or: [
            { name: { $regex: userName, $options: "i" } },
            { lastname: { $regex: userName, $options: "i" } },
          ],
        },
        "_id"
      );
      if (users.length) filters.user = { $in: users.map((user) => user._id) };
    }

    const markers = await Marker.find(filters, null, options);

    res.json({
      markers,
      count: markers.length,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc Obtiene los datos de un marcador del mapa
// @route GET /api/markers/:markerId
// @access Private
export const getMarkerById = async (req, res, next) => {
  const { markerId } = req.params;

  try {
    const marker = await Marker.findById(markerId)
      .populate("user", "name lastname")
      .populate("category", "name");
    if (!marker) throw new ErrorResponse("No existe el marcador", 404);

    res.json({ data: marker });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc Agrega un nuevo marcador al mapa
// @route POST /api/markers
// @access Private
export const addMarker = async (req, res, next) => {
  const { longitude, latitude } = req.body;

  try {
    const marker = new Marker(req.body);
    marker.user = req.id;

    if (!req.file) throw new ErrorResponse("Debe subir una foto", 404);

    marker.location = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };

    const result = await uploadImage(req.file.path, "markers");
    marker.image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
    await fs.unlink(req.file.path);

    const markerDB = await marker.save();

    res.json({ marker: markerDB, message: "Marcador creado" });
  } catch (error) {
    try {
      if (req.file) await fs.unlink(req.file.path);
    } catch (error) {
      console.log(error);
    }
    console.log(error);
    next(error);
  }
};

// @desc Activa o inactiva un marcador para que aparezca en el mapa
// @route PATCH /api/markers/:markerId
// @access Private
export const changeStatusMarker = async (req, res, next) => {
  const { markerId } = req.params;
  const { active } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const marker = await Marker.findById(markerId, "_id user");
    if (!marker) throw new ErrorResponse("No existe el marcador", 404);

    await Marker.updateOne({ _id: markerId }, { active }, { session });

    await session.commitTransaction();

    res.json({
      markerId,
      message: active ? "Marcador activado" : "Marcador desactivado",
    });
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc Actualizar un marcador
// @route PUT /api/markers/:markerId
// @access Private
export const updateMarker = async (req, res, next) => {
  const { markerId } = req.params;

  try {
    const marker = await Marker.findById(markerId);
    if (!marker) throw new ErrorResponse("No existe el marcador", 404);

    const newMarker = {
      ...req.body,
      user: req.id,
    };

    if (req.file) {
      const result = await uploadImage(req.file.path, "markers");
      newMarker.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.file.path);
      if (marker.image?.public_id) await deleteImage(marker.image.public_id);
    }

    const updateMarker = await Marker.findByIdAndUpdate(markerId, newMarker, {
      new: true,
    });

    res.json({
      data: updateMarker,
      message: "Marcador actualizado",
    });
  } catch (error) {
    try {
      if (req.file) await fs.unlink(req.file.path);
    } catch (error) {
      console.log(error);
    }
    console.log(error);
    next(error);
  }
};

// @desc Eliminar un marcador
// @route /api/markers/:markerId
// @access Private
export const deleteMarker = async (req, res, next) => {
  const { markerId } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const marker = await Marker.findById(markerId);
    if (!marker) throw new ErrorResponse("No existe el marcador", 404);

    await Marker.findByIdAndDelete(markerId, { session });

    if (marker.image?.public_id) await deleteImage(marker.image.public_id);

    await session.commitTransaction();
    res.json({ markerId, userId: marker.user, message: "Marcador eliminado" });
  } catch (error) {
    console.log({ error });
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc Obtiene el detalle de los marcadores favoritos del usuario logueado
// @route /api/favorites/markers
// @access Private
export const getFavMarkers = async (req, res, next) => {
  try {
    const user = await User.findById(req.id).select("_id").populate({
      path: "favMarkers",
      select: "name category image ratingAverage ratingCount createdAt",
      populate: "category",
    });
    if (!user._id) throw new ErrorResponse("El usuario no existe");

    res.json({ favMarkers: user.favMarkers, count: user.favMarkers.length });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc agrega un marcador como favorito de un usuario
// @route /api/favorites/markers
// @access Private
export const addFavMarkers = async (req, res, next) => {
  const { markerId } = req.body;

  try {
    await User.findByIdAndUpdate(req.id, { $push: { favMarkers: markerId } });
    res.json({ message: "Se agregó a favoritos" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// @desc elimina un marcador como favorito de un usuario
// @route /api/favorites/markers/:markerId
// @access Private
export const deleteFavMarkers = async (req, res, next) => {
  const { markerId } = req.params;

  try {
    await User.findByIdAndUpdate(req.id, { $pull: { favMarkers: markerId } });
    res.json({ message: "Se quitó de favoritos" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
