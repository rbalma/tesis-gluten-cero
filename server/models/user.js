const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserScheme = Schema( {
    name: {
        type:String,
        trim:true
    },
    lastname: {
        type:String, 
        trim:true
    },
    email: {
        type: String,
        required: [true, "Debe ingresar un correo"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Debe ingresar un correo válido'
        ]
    },
    password: {
        type: String,
        required: [true, "Debe ingresar una contraseña"],
        minlength: [6, "Debe tener más de 5 caracteres"],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: {
        type: String,
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    dicebear: {
        type: String,
        default: ''
    },
    favRecipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});


UserScheme.pre("save", async function(next) {
    //si la contraseña no fue actualizada
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserScheme.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}


UserScheme.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
}


UserScheme.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserScheme);