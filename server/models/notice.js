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
    link : {
        type: String,
        required: [true, 'Debe ingresar un link'],
    },
    source : {
        type: String,
        required: [true, 'Debe ingresar una fuente'],
    },
    avatar: {
        data: {
            type: Buffer,
            required: [true, 'Debe ingresar una imagen'],
        },
        contentType: {
            type: String,
            required: [true, 'Debe ingresar una imagen'],
        }
    }
});

noticesSchema.plugin(mongoosePaginate);

export default mongoose.model('Notice', noticesSchema);
