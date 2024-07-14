import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  marca: {
    type: String,
    trim: true,
    uppercase: true,
  },
  denominacionVenta: {
    type: String,
    trim: true,
    uppercase: true,
  },
  tipoProducto: {
    type: String,
    trim: true,
    uppercase: true,
  },
  estado: {
    type: String,
    trim: true,
    uppercase: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
}, {
  collation: { locale: 'en' }
});

productsSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productsSchema);
