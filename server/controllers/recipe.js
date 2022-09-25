const Recipe = require('../models/Recipe');
const ErrorResponse = require('../utils/errorResponse');
const { fsUnlink } = require('../utils/fsUnlink');

// @desc Agregar una nuevo receta
// @route /api/recipes
// @access Private
exports.addRecipes = async (req, res, next) => {
  const recipe = new Recipe(req.body);

  try {
    recipe.user = req.user.id;
    if (req.file) recipe.image = req.file.filename;

    const recipeDB = await recipe.save();

    res.json({
      ok: true,
      data: recipeDB,
      message: 'Receta creada',
    });
  } catch (error) {
    if (req.file) fsUnlink(`/recipes/${req.file.filename}`);
    next(error);
  }
};

// @desc Obtener una receta
// @route /api/recipes/:recipeId
// @access Public
exports.getRecipesById = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId)
      .populate('user', 'name lastname')
      .populate('category', 'name color');
    if (!recipe) return next(new ErrorResponse('No existe la receta', 404));

    return res.json({ ok: true, data: recipe });
  } catch (error) {
    next(error);
  }
};

// @desc Obtener las recetas paginadas
// @route /api/recipes
// @access Public
exports.getRecipes = async (req, res, next) => {
  const {
    page = 1,
    limit = 20,
    search = '',
    sort = { date: 1 },
    active,
    category,
    user,
  } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort,
    populate: [
      {
        path: 'user',
        select: 'name lastname',
      },
      {
        path: 'category',
        select: 'name color',
      },
    ],
  };

  let filters = {};
  if (active) filters = { active };
  if (category) filters = { ...filters, category };
  if (user) filters = { ...filters, user };

  try {
    if (search) {
      const recipes = await Recipe.paginate(
        {
          ...filters,
          title: { $regex: search, $options: 'i' },
        },
        options
      );
      return res.json({ ok: true, data: recipes.docs });
    }

    const recipes = await Recipe.paginate({ ...filters }, options);
    res.json({
      ok: true,
      data: recipes.docs,
      totalPages: recipes.totalPages,
      count: recipes.totalDocs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Habilitar la receta de un usuario para que se vea en la web
// @route /api/active-recipe/:recipeId
// @access Private
exports.activateRecipe = async (req, res, next) => {
  const { recipeId } = req.params;
  const { active } = req.body;

  try {
    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { active },
      { new: true }
    );
    if (!recipe) return next(new ErrorResponse('No existe la receta', 404));

    return res.json({
      ok: true,
      data: recipe,
      message: active ? 'Receta activada' : 'Receta desactivada',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Actualizar una receta
// @route /api/recipes/:recipeId
// @access Private
exports.updateRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return next(new ErrorResponse('No existe la receta', 404));

    // Verifica que solo el usuario que creó la receta pueda actualizarlo
    if (recipe.user.toString() !== req.id)
      return next(
        new ErrorResponse('No tiene privilegios para editar esta receta', 401)
      );

    // En el body de la petición no viene el id del user
    const newRecipe = {
      ...req.body,
      user: req.id,
      date: Date.now(),
      active: false,
      isUpdated: true,
    };

    if (req.file) {
      newRecipe.image = req.file.filename;
      fsUnlink(`/recipes/${recipe.image}`);
    }

    // new : true es para que me devuelve la receta con los datos actualizados
    const updateRecipe = await Recipe.findByIdAndUpdate(recipeId, newRecipe, {
      new: true,
    });

    res.json({
      ok: true,
      data: updateRecipe,
      message: 'Receta actualizada',
    });
  } catch (error) {
    if (req.file) fsUnlink(`/recipes/${req.file.filename}`);
    next(error);
  }
};

// @desc Eliminar una receta
// @route /api/recipes/:recipeId
// @access Private
exports.deleteRecipe = async (req, res, next) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return next(new ErrorResponse('No existe la receta', 404));

    await Recipe.findByIdAndDelete(recipeId);
    await Comment.deleteMany({ recipe: id });
    // await User.updateMany({}, { $pull: { favRecipes: id } });

    if (recipe.image) fsUnlink(`/recipes/${recipe.image}`);

    res.json({ ok: true, data: recipeId, message: 'receta eliminada' });
  } catch (error) {
    next(error);
  }
};
