const mongoose = require('mongoose');
const schema = require('./menu-schema');
const model = mongoose.model('menuModel', schema);
module.exports = model;
