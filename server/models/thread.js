const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const threadSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'open'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }
});

threadSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Thread', threadSchema);