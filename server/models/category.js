import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Debe ingresar un nombre para la categoría'],
  },
  color: {
    type: String,
    trim: true,
    unique: true,
  },
});

export default mongoose.model('Category', categorySchema)
