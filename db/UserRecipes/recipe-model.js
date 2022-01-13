const mongoose = require('mongoose');
const schema = require('./recipe-schema');
const model = mongoose.model('RecipeModel', schema);
module.exports = model;
