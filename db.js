var settings = {
    "ip": "localhost",
    // "ip": "10.32.10.141",
    "db": "test",
    "host": 27017
};
var mongoose = require('mongoose');
mongoose.connect("mongodb://"+ settings.ip +"/"+ settings.db);

var db = mongoose.connection;

module.exports={
    "dbCon": db,
    "mongoose": mongoose
};