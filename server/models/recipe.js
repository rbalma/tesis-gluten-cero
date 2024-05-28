import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import User from "./user.js";
import Reviews from "./reviews.js";
import ReplyReview from "./replyReview.js";

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Debe ingresar un título para la receta"],
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Debe seleccionar una categoría"],
    },
    preparationTime: {
      type: Number,
      default: 0,
    },
    performance: {
      type: Number,
      default: 0,
    },
    ingredients: {
      type: [String],
      required: [true, "Debe ingresar los ingredientes de la receta"],
    },
    instructions: {
      type: [String],
      required: [true, "Debe ingresar los pasos de la receta"],
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
    isUpdated: {
      type: Boolean,
      default: false,
    },
    ratingAverage: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

recipeSchema.post("findOneAndDelete", async (doc, next) => {
  // elimino la receta del array de favoritos para los usuarios
  await User.updateMany({}, { $pull: { favRecipes: doc._id } });

  const reviewsToDelete = await Reviews.find({ recipe: doc._id }, "_id");
  const reviewsIds = reviewsToDelete.map((review) => review._id);

  // elimino las reseñas de las recetas
  await Reviews.deleteMany({ _id: { $in: reviewsIds } });

  // elimino las respuestas de esas reseñas en caso de que existan
  await ReplyReview.deleteMany({ review: { $in: reviewsIds } });

  next();
});

recipeSchema.plugin(mongoosePaginate);
const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
