const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const marketSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  direction: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
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
  image: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  active: {
    type: Boolean,
    default: false,
  },
});

marketSchema.index({ location: "2dsphere" });
marketSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Market", marketSchema);
