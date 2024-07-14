import mongoose from "mongoose";

const Schema = mongoose.Schema;

const replyReviewSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  },
  { timestamps: true }
);

const replyReview = mongoose.model("reply_review", replyReviewSchema);

export default replyReview;