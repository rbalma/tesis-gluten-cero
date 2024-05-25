import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const noticesSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Debe ingresar el título de la noticia"],
    },
    date: {
      type: Date,
      required: [true, "Debe ingresar la fecha de publicación de la noticia"],
    },
    link: {
      type: String,
      required: [true, "Debe ingresar el enlace que redirecciona a la noticia"],
    },
    source: {
      type: String,
      required: [true, "Debe ingresar la fuente de la noticia"],
    },
    image: {
      type: String,
      required: [true, "Debe ingresar una foto de la noticia"],
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

noticesSchema.plugin(mongoosePaginate);

export default mongoose.model("Notice", noticesSchema);
