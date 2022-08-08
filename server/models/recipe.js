const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    title : {
        type: String,
        trim: true
    },
    category: String,
    date : {
        type: Date,
        default: Date.now()
    },
    ingredients : String,
    description : String,
    image: String,
    imgUrl:  String,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    active: Boolean
});

recipeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Recipe', recipeSchema);