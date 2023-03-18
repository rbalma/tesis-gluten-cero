import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import Thread from './thread.js';

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


postSchema.post("save", async function (doc) {
    await Thread.findByIdAndUpdate(doc.thread, { $push: { posts: doc._id } });
  });

postSchema.post("remove", async function (doc) {
    await Thread.findByIdAndUpdate(this.thread, { $pull: { posts: doc._id } });
});

postSchema.plugin(mongoosePaginate);

export default mongoose.model('Post', postSchema);