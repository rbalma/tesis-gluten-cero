import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;

const productsSchema = new Schema ({
    marca: {
        type: String,
        trim: true,
    },
    denominacionVenta: {
        type: String,
        trim: true,
    },
    tipoProducto: {
        type: String,
        trim: true,
    },
    description : {
        type: String,
        trim: true,
    },
    estado: {
        type: String,
        enum: ["VIGENTE", "BAJA PROVISORIA"],
    }
});

productsSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', productsSchema);
