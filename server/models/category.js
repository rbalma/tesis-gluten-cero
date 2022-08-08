const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    }
});

categorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Category', categorySchema);