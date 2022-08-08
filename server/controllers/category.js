const Category = require('../models/category');
const Recipe = require('../models/recipe');


const newCategory = async(req, res) => {
    const category = new Category();
    const { name } = req.body;
    category.name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    try {
      if (!name) {
        return res.status(401).json({
            ok: false,
            message: "El nombre de la categoría es obligatorio",
          });
      }

      const categoryDB = await category.save();

      if (!categoryDB) {
        return res.status(400).json({ ok: false, message: "La categoría ya existe" });
      }

      res.json({ ok: true, category: categoryDB, message: "Categoría agregada" });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        message: "Hable con el administrador",
      });
    }
}

const getCategory = async(req, res) => {
    const categories = await Category.find({}, 'name').sort({name: 1});
    res.json({
        ok: true,
        categories
    });
}

const getCategoryByPagination = async(req, res) => {
    const { limit = 6, page = 1 } = req.query;
    const options = {
        page,
        limit: parseInt(limit),
        sort: { name: 1 },
    }

    const categories = await Category.paginate({}, options);
    res.json({
        ok: true,
        categories
    });
}

const deleteCategory = async(req, res) => {
    const categoryId = req.params.id;
  
    try {
        const category = await Category.findById( categoryId );
        if(!category){
           return res.status(404).json({
                ok: false,
                message: 'La categoría no existe'
            });
        }

        const recipe = await Recipe.findOne({category: category.name})
        if(recipe){
            return res.status(401).json({
                 ok: false,
                 message: 'Existe al menos una receta con esa categoría'
             });
         }

        await Category.findByIdAndDelete( categoryId );

        res.json({ ok: true, message: 'Categoría eliminada' });

    } catch (error) {
        console.log(error);
       return res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}


module.exports = {
    newCategory,
    getCategory,
    deleteCategory,
    getCategoryByPagination
}