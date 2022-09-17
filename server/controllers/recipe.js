const Recipe = require('../models/recipe');
const Comment = require('../models/comments');
const User = require("../models/User");
const multer = require('multer');
const shortid = require('shortid');
const path = require("path");
const fs = require('fs');

const configuracionMulter = {
  // 1 Mb
  limits: { fileSize: 1 * 1000 * 1000 },
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/recipes");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("La extension de la imagen no es válida. (Extensiones permitidas: .png y .jpg)"));
    }
  },
};

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('image');

// Sube un archivo 
const subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            if(error instanceof multer.MulterError){
                if(error.code === 'LIMIT_FILE_SIZE') {
                   return res.status(404).json({mensaje: 'La imagen es muy grande. Límite de 1 MB'});
                } else {
                 return res.status(404).json({mensaje: error.message});
                }
            } else if(error.hasOwnProperty('message')) {
              return res.status(404).json({message: error.message});
            } 
        }
        return next();
    })
}


// Agrega nuevas recetas
const newRecipe = async (req, res) => {
  const recipe = new Recipe();

  const { title, category, ingredients, description } = req.body;
  recipe.title = title.toLowerCase();
  recipe.category = category;
  recipe.ingredients = ingredients;
  recipe.description = description;
  recipe.imgUrl = `/api/v1/recipes/get-image/${req.file.filename}`;
  recipe.image = req.file.filename;
  recipe.active = false;

  try {
    recipe.user = req.user.id;
    if (!title || !category || !ingredients || !description) {
      return res.status(401).json({ 
        ok: false, 
        message: "Todos los campos son obligatorios" 
      });
    }
    const recipeDB = await recipe.save();

    if (!recipeDB) {
      return res.status(400).json({ 
        ok: false, 
        message: "No se puedo crear la receta" 
      });
    }
      res.json({ 
        ok: true, 
        recipe: recipeDB,
        message: 'Receta creada' 
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};



// Obtener una receta por id
const getRecipeById = async (req, res) => {
  const params = req.params;

  const recipe = await Recipe.findById({ _id: params.id }).populate('user', 'name lastname');

  if (!recipe) {
    return res.status(404).json({ ok: false, message: "No existe la receta" });
  }
  res.json({
    ok: true,
    recipe,
  });
};

// Obtener las receta de un usuario 
const getRecipesByUser = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 6, status = true  } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: 1 },
    populate: {
      path: 'user',
      select: 'name lastname'
    },
  }
  const recipes = await Recipe.paginate({active: status, user: id }, options);
  if (!recipes) {
    return res.status(404).json({ message: "No existe la receta" });
  }
  res.json({ ok: true, recipes });
};


// Obtener las receta de un usuario para la tabla de perfiles
const getRecipesByUserTable = async (req, res) => {
  const { id } = req.params;

  const recipes = await Recipe.find({ user: id }).sort({date: -1});
  if (!recipes) {
    return res.status(404).json({ message: "No existe la receta" });
  }
  res.json({ ok: true, recipes });
};


// Obtener las recetas en estado true o false. Filtrar por titulo
const getRecipesActive = async (req, res) => {
  const { search, page = 1, limit = 10, status = true } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: 1 },
    populate: {
      path: 'user',
      select: 'name lastname'
    },
  }
  
  if(!search){
    const recipes = await Recipe.paginate({active: status}, options);
    return res.json({ ok: true, recipes });
  } 
    const recipes = await Recipe.paginate({active: true, title: {$regex: search} }, options);
    res.json({ ok: true, recipes });
}


// Obtener todas los títulos de las recetas
const getRecipesTitles = async(req, res) => {
  const recipes = await Recipe.find();
  const titles = recipes.map(({title}) => ({ value: title.charAt(0).toUpperCase() + title.slice(1) }));
 
     res.json({
         ok: true,
         titles
     });
 }
 
const getRecipesFilterByCategories = async (req, res) => {

  const { category, sort, page = 1, limit = 10 } = req.query;
  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: sort } //asc - desc
  }
 
  try {
    const recipes = await Recipe.paginate({ active: true, category: { $in: category} }, options);
    if(!recipes){
      return res.status(404).json({ok: false, message: 'No existen recetas'});
    }
    res.json({ok: true, recipes});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador'
    });
  }
  
// title: { $regex: new RegExp('.*' + search.toLowerCase() + '.*')

}


const uploadImage = async (req, res) => {
  const { id } = req.params;
  let imagenAnteriorPath = "";

  try {
    const recipe = await Recipe.findById({ _id: id });
    if (!recipe) {
      return res
        .status(404)
        .json({ ok: false, message: "La receta no existe" });
    }

    if (recipe.image) {
      imagenAnteriorPath = __dirname + `/../uploads/recipes/${recipe.image}`;
    }

    if (req.file) {
      let fileName = req.file.filename;
      recipe.image = `/api/v1/recipes/get-image/${fileName}`;
      const recipeUpdate = await Recipe.findByIdAndUpdate( { _id: id }, recipe, { new: true } );

      if (imagenAnteriorPath) {
        //Eliminar archivo con filesystem
        fs.unlink(imagenAnteriorPath, (err) => {
          if (err) {
            return res.status(404).json({ message: "La imagen no se pudo eliminar del File System." });
          }
        });
      }
      return res.json({ok: true, recipeUpdate })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, message: "Hable con el administrador" });
  }
};
  
// Obtener la imagen de la receta
const getImage = (req, res) => {
    const { imageName } = req.params;
    const filePath = "./uploads/recipes/" + imageName;
  
    fs.exists(filePath, exists => {
      if (!exists) {
        res.status(404).send({ message: "La imagen que buscas no existe." });
      } else {
        res.sendFile(path.resolve(filePath));
      }
    });
}


// Actualizar receta
const updateRecipe = async(req, res) => {
  const recipeId = req.params.id;

  try {
      const recipe = await Recipe.findById( recipeId );
      if(!recipe){
         return res.status(404).json({
              ok: false,
              message: 'La receta no existe'
          });
      }

      // Verifica que solo el usuario que creó la receta pueda actualizarlo
      if(recipe.user.toString() !== req.user.id){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegios para editar esta receta'
        });
      }
      // En el body de la petición no viene el id del user
      const newRecipe = {
        ...req.body,
        user: req.user.id,
        date: Date.now(),
        active: false,
        title: req.body.title.toLowerCase()
    }

     let imagenAnteriorPath = __dirname + `/../uploads/recipes/${recipe.image}`;

      if (req.file) {
        newRecipe.imgUrl = `/api/v1/recipes/get-image/${req.file.filename}`;
        newRecipe.image = req.file.filename;

        //Eliminar archivo con filesystem
        fs.unlink(imagenAnteriorPath, (err) => {
          if (err) {
            console.log("La imagen no se pudo eliminar del File System")
          }
        });
      }

      

      // new : true es para que me devuelve la receta con los datos actualizados
      const updateRecipe = await Recipe.findByIdAndUpdate( recipeId, newRecipe, { new: true });

      res.json({
          ok: true,
          recipe: updateRecipe,
          message: 'Receta actualizada'
      })
      
  } catch (error) {
      console.log(error);
     return res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
      });
  }
}


// Eliminar receta
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  
  try {
      const recipe = await Recipe.findById( id );
      if(!recipe){
         return res.status(404).json({
              ok: false,
              message: 'La receta no existe'
          });
      }

      await Recipe.findByIdAndDelete( id );
      await Comment.deleteMany({recipe: id});
      await User.updateMany({}, { $pull: {favRecipes: id} });

  if (recipe.image) {
    const imagenAnteriorPath =
      __dirname + `/../uploads/recipes/${recipe.image}`;
    //Eliminar archivo con filesystem
    fs.unlink(imagenAnteriorPath, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ ok: false, message: "La imagen no se pudo eliminar del File System." });
      } else {
        return res.json({ ok: true, message: "Receta eliminada" });
      }
    });
  } 
  } catch (error) {
      console.log(error);
     return res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
      });
  }  
}


// Activar o desactivar recetas
const activateRecipe = async(req, res) => {
    const { id } = req.params;
    const { active } = req.body;
  
   const recipe = await Recipe.findByIdAndUpdate(id, { active }, { new: true });

   if(active){
     return res.json({ok: true, message: 'Receta activada', recipe });
   }

   res.json({ok: true, message: 'Receta desactivada', recipe });
   
}


module.exports = {
    newRecipe,
    subirArchivo,
    uploadImage,
    getImage,
    updateRecipe,
    getRecipeById,
    getRecipesByUser,
    getRecipesByUserTable,
    getRecipesTitles,
    deleteRecipe,
    activateRecipe,
    getRecipesActive,
    getRecipesFilterByCategories
}