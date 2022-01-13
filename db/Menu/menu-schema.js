const mongoose = require('mongoose');
const schema = mongoose.Schema({
    id: Number,
    recipeList: Array,
    menuName: String,
    tag:Array,
    
    
}, {collection: 'menu'});
module.exports = schema;