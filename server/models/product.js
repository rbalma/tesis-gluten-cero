import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  marca: {
    type: String,
    trim: true,
    lowercase: true,
  },
  denominacionVenta: {
    type: String,
    trim: true,
    lowercase: true,
  },
  tipoProducto: {
    type: String,
    trim: true,
    lowercase: true,
  },
  estado: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

productsSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productsSchema);
