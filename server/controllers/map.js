const Market = require('../models/market');
const ErrorResponse = require('../utils/errorResponse');
const { uploadImage, deleteImage } = require('../services/cloudinary');
const fs = require('fs-extra');

// @desc Obtener los marcadores cercanos a una ubicación
// @route /api/map
// @access Public
exports.marketsByLocation = async (req, res) => {
  let { lng, lat, mts } = req.query;

  lng = parseFloat(lng);
  lat = parseFloat(lat);
  mts = parseInt(mts);

  try {
    const markets = await Market.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: mts,
        },
      },
    });

    res.json({ ok: true, data: markets });
  } catch (error) {
    next(error);
  }
};

// @desc Agrega un nuevo marcador al mapa
// @route GET /api/markets
// @access public
exports.getMarkets = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    active,
    category,
    user,
    type,
  } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: 'desc' },
    populate: [
      {
        path: 'user',
        select: 'name lastname',
      },
    ],
  };

  let filters = {};
  if (active) filters = { active };
  if (category) filters = { ...filters, category };
  if (user) filters = { ...filters, user };
  if (type) filters = { ...filters, type };

  try {
    if (search) {
      const markets = await Market.paginate(
        {
          ...filters,
          name: { $regex: search, $options: 'i' },
        },
        options
      );
      return res.json({ ok: true, data: markets.docs });
    }

    const markets = await Market.paginate({ ...filters }, options);
    res.json({
      ok: true,
      data: markets.docs,
      totalPages: markets.totalPages,
      count: markets.totalDocs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Obtiene un marcador del mapa
// @route GET /api/markets/:marketId
// @access private
exports.getMarketById = async (req, res, next) => {
  const { marketId } = req.params;

  try {
    const market = await Market.findById(marketId).populate(
      'user',
      'name lastname'
    );
    if (!market) return next(new ErrorResponse('No existe el marcador', 404));

    return res.json({ ok: true, data: market });
  } catch (error) {
    next(error);
  }
};

// @desc Agrega un nuevo marcador al mapa
// @route POST /api/markets
// @access private
exports.addMarket = async (req, res) => {
  const { type, longitude, latitude } = req.body;
  const lng = parseFloat(longitude);
  const lat = parseFloat(latitude);

  try {

    if (!req.file) return next(new ErrorResponse('Debe subir una foto', 404));

    const location = { type: 'Point', coordinates: [lng, lat] };

    const result = await uploadImage(req.file.path, 'markets');
    await fs.unlink(req.file.path);

    const newMarket = {
      ...req.body,
      user: req.id,
      type: parseInt(type),
      image: {
        public_id: result.public_id,
        secure_url: result.secure_url
      },
      location: location,
    };

    const marketDB = await Market.create(newMarket);
    res.json({ ok: true, market: marketDB, message: 'Marcador creado' });

  } catch (error) {
    next(error);
  }
};

// @desc Habilitar el marcador para que se vea en el mapa
// @route PUT /api/active-market/:marketId
// @access Private
exports.activateMarket = async (req, res, next) => {
  const { marketId } = req.params;
  const { active } = req.body;

  try {
    const market = await Market.findByIdAndUpdate(
      marketId,
      { active },
      { new: true }
    );
    if (!market) return next(new ErrorResponse('No existe el marcador', 404));

    return res.json({
      ok: true,
      data: market,
      message: active ? 'Marcador activado' : 'Marcador desactivado',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Actualizar un marcador
// @route /api/markets/:marketId
// @access Private
exports.updateMarket = async (req, res, next) => {
  const { marketId } = req.params;

  try {
    const market = await Market.findById(marketId);
    if (!market) return next(new ErrorResponse('No existe el marcador', 404));

    // Verifica que solo el usuario que creó el marcador pueda actualizarlo
    if (market.user.toString() !== req.id)
      return next(
        new ErrorResponse('No tiene privilegios para editar este marcador', 401)
      );

    const newMarket = {
      ...req.body,
      user: req.id,
      date: Date.now(),
      active: false,
    };

    if (req.file) {
      const result = await uploadImage(req.file.path, 'markets');
      newMarket.image = {
        public_id: result.public_id,
        secure_url: result.secure_url
      };
      await fs.unlink(req.file.path);
      if (market.image?.public_id) await deleteImage(market.image.public_id);
    }

    const updateMarket = await Market.findByIdAndUpdate(marketId, newMarket, {
      new: true,
    });

    res.json({
      ok: true,
      data: updateMarket,
      message: 'Marcador actualizado',
    });
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path);
    next(error);
  }
};

// @desc Eliminar un marcador
// @route /api/markets/:marketId
// @access Private
exports.deleteMarket = async (req, res, next) => {
  const { marketId } = req.params;

  try {
    const market = await Market.findById(marketId);
    if (!market) return next(new ErrorResponse('No existe el marcador', 404));

    await Market.findByIdAndDelete(marketId);

    if (market.image?.public_id) await deleteImage(market.image.public_id);

    res.json({ ok: true, data: marketId, message: 'Marcador eliminado' });
  } catch (error) {
    next(error);
  }
};
