const mongoose = require('mongoose');
const schema = require('./allRecipe-schema');
const model = mongoose.model('allRecipeModel', schema);
module.exports = model;
