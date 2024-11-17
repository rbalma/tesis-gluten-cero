import mongoose from "mongoose";
const Schema = mongoose.Schema;

const webPushSubscriptionSchema = new Schema(
  {
    endpoint: {
      type: String,
    },
    p256dh: {
      type: String,
    },
    auth: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("WebPushSubscription", webPushSubscriptionSchema);
