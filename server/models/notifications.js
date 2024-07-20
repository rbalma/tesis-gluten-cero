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
    event: {
      type: String,
      trim: true,
      required: [true, "Debe ingresar el evento de la notificación"],
      enum: {
        values: ["RECIPE_APPROVED", "RECIPE_REJECTED", "RECIPE_VALUED"],
        message: "{VALUE} no es un tipo de rol",
      },
    },
    read: {
      type: Boolean,
      default: false,
    },
    originUser: {
      type: String,
      trim: true,
    },
    notifiedUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  },
  { timestamps: true }
);

notificationSchema.plugin(mongoosePaginate);

export default mongoose.model("Notification", notificationSchema);
