import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const Schema = mongoose.Schema;

const noticesSchema = new Schema ({
    title : {
        type: String,
        trim: true,
        required: [true, 'Debe ingresar un título'],
        unique: true,
    },
    date : {
        type: Date,
        default: Date.now
    },
    description : {
        type: String,
        trim: true,
        required: [true, 'Debe ingresar una descripción'],
    },
    image: {
        type: String,
        required: [true, 'Debe ingresar una imagen'],
    }
});

noticesSchema.plugin(mongoosePaginate);

export default mongoose.model('Notice', noticesSchema);
