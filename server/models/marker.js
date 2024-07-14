import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const markerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    direction: {
      type: String,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Debe seleccionar una categoría"],
    },
    image: {
      public_id: String,
      secure_url: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    active: {
      type: Boolean,
      default: true,
    },
    ratingAverage: {
      type: mongoose.Types.Decimal128,
      default: 0.00,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

markerSchema.index({ location: "2dsphere" });
markerSchema.plugin(mongoosePaginate);

export default mongoose.model("Marker", markerSchema);
