const mongoose = require('mongoose');
const schema = mongoose.Schema({
    id: String,
    followers: Array
    
    
}, {collection: 'recipeList'});
module.exports = schema;