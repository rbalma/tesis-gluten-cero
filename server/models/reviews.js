import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
    marker: {
      type: Schema.Types.ObjectId,
      ref: "Marker",
    },
    reply: {
      type: Schema.Types.ObjectId,
      ref: "ReplyReview",
    },
  },
  { timestamps: true }
);

reviewSchema.plugin(mongoosePaginate);
const Review = mongoose.model("Review", reviewSchema);

export default Review;
