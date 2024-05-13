import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const marketSchema = new Schema(
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
    type: {
      type: Number, // 0 - Comercio, 1 - Restaurante, 2 - Centro de Salud
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
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
      default: false,
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

marketSchema.index({ location: "2dsphere" });
marketSchema.plugin(mongoosePaginate);

export default mongoose.model("Market", marketSchema);
