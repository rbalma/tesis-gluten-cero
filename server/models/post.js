const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: {
        type: String,
        required: [true, 'Debe escribir el posteo']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
    },
    isUpdated: {
        type: Boolean,
        default: false,
      },
     postMother: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
});

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);