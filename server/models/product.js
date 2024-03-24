import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;

const productsSchema = new Schema ({
    rnpa: {
        type: String,
        trim: true,
        unique: true,
    },
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
});

productsSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', productsSchema);
