import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Debe ingresar un nombre para la categoría'],
  },
  description: {
    type: String,
    trim: true,
  },
  avatar: {
    data: {
      type: Buffer,
    },
    contentType: {
      type: String,
    }
  },
  type: {
    type: String,
    trim: true,
    required: [true, 'Debe especificar el tipo de categoría (Mapa o Receta)'],
    enum: ['Mapa', 'Receta']
  },
});

export default mongoose.model('Category', categorySchema)
