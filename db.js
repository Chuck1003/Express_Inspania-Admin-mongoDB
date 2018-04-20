var settings = {
    // "ip": "localhost",
    "ip": "10.32.57.126",
    "db": "test",
    "host": 27071
};
var mongoose = require('mongoose');
mongoose.connect("mongodb://"+settings.ip+"/"+settings.db);

var db = mongoose.connection;

module.exports={
    "dbCon": db,
    "mongoose": mongoose
};