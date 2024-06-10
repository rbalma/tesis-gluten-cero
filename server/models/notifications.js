import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
      required: [true, "Debe ingresar la descripción de la notificación"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    userSends: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    notifiedUser: {
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
  },
  { timestamps: true }
);

notificationSchema.plugin(mongoosePaginate);

export default mongoose.model("Notification", notificationSchema);
