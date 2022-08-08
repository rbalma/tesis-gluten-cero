const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
    }
});

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);