import mongoose from "mongoose";

const rejectedRecipeSchema = new Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const rejectedRecipes = mongoose.model("rejected_recipes", rejectedRecipeSchema);

export default rejectedRecipes;