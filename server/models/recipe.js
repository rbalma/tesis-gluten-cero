import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Debe ingresar un título para la receta'],
    unique: true,
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
    public_id: String,
    secure_url: String
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

export default Recipe;
