var mongoose = require('../db').mongoose;
var schema = new mongoose.Schema({
    id: Number,
    name: String,
    type: Number,
    place: String,
    editable: Number,
});

var Books = mongoose.model('books',schema);
module.exports = Books;