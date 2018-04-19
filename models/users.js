var mongoose = require('../db').mongoose;
var schema = new mongoose.Schema({
    id: Number,
    name: String,
    password: String
});

var User = mongoose.model('users',schema);
module.exports = User;