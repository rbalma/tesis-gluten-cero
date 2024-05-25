import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Debe ingresar un nombre para la categoría"],
  },
  image: {
    type: String,
    trim: true,
    required: [true, "Debe ingresar una foto de la categoría"],
  },
  type: {
    type: String,
    required: [true, "Debe especificar el tipo de categoría (Mapa o Receta)"],
    enum: ["M", "R"],
  },
  visible: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Category", categorySchema);
