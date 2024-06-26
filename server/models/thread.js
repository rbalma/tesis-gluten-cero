import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Debe ingresar un título'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Debe ingresar una descripcion'],
    trim: true,
    unique: true,
  },
  status: {
    type: String,
    enum: {
      values: ["open", "closed"],
      message: "{VALUE} no es un estado válido",
    },
    default: "open",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post",
  }],
  isUpdated: {
    type: Boolean,
    default: false,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
});

ThreadSchema.plugin(mongoosePaginate);

export default mongoose.model("Thread", ThreadSchema);
