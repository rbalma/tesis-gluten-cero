import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  content: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
  },
  isReply: {
    type: Boolean,
    default: false,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.model("Comment", commentsSchema);
