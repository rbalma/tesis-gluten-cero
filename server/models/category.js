const mongoose = require('mongoose');
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

module.exports = mongoose.model('Category', categorySchema);
