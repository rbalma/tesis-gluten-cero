const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Debe ingresar un correo"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Debe ingresar un correo válido",
    ],
  },
  password: {
    type: String,
    required: [true, "Debe ingresar una contraseña"],
    match: [
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,30}$/,
      "La contraseña no respeta los requisitos: Entre 8 y 30 caracteres. Como mínimo una letra minúscula, una letra mayúscula y un número.",
    ],
    select: false,
  },
  role: {
    type: String,
    enum: { values: ['admin', 'user'], message: '{VALUE} no es un tipo de rol' },
    default: 'user'
  },
  active: {
    type: Boolean,
    default: false,
  },
  google: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  dicebear: String,
  favRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  favMarkets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Market",
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  //si la contraseña no fue actualizada
  if (!this.isModified("password")) {
    next();
  }

  this.dicebear ||= `https://avatars.dicebear.com/api/initials/${this.name}%20${this.lastname}.svg?bold=true`;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.newPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function (payload) {
  return jwt.sign({ user: payload }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 30 * (60 * 1000); // Thirty Minutes

  return resetToken;
};

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", UserSchema);

module.exports = User;
