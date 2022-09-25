const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Debe ingresar un título para la receta'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Debe seleccionar una categoría'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  ingredients: {
    type: [String],
    required: [true, 'Debe ingresar los ingredientes de la receta'],
  },
  steps: {
    type: [String],
    required: [true, 'Debe ingresar los pasos de la receta'],
  },
  image: {
    type: String,
    required: [true, 'Debe ingresar una foto de la receta'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  active: {
    type: Boolean,
    default: false,
  },
  isUpdated: {
    type: Boolean,
    default: false,
  },
});

recipeSchema.plugin(mongoosePaginate);
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
