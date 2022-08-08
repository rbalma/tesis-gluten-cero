const express = require("express");
const UserController = require("../controllers/user");

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/sign-up", UserController.register);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);

api.put("/upload-avatar/:id", UserController.subirArchivo, UserController.uploadAvatar);
api.get("/get-avatar/:avatarName", UserController.getAvatar);

api.get("/get-user/:id", UserController.getUserById);
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
api.put("/activate-user/:id", [md_auth.ensureAuth], UserController.activateUser);
api.delete("/delete-user/:id", [md_auth.ensureAuth], UserController.deleteUser);

api.post("/sign-up-admin", [md_auth.ensureAuth], UserController.signUpAdmin);

api.put("/user/fav-recipe/:idRecipe", [md_auth.ensureAuth], UserController.addFavRecipe);
api.delete("/user/fav-recipe/:idRecipe", [md_auth.ensureAuth], UserController.deleteFavRecipe);
api.get("/user/fav-recipe/:idUser", [md_auth.ensureAuth], UserController.getFavRecipeByUser);
api.get("/user/fav/:idUser", [md_auth.ensureAuth], UserController.getFavRecipes);

module.exports = api;