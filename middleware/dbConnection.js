var config = require('config.json');
var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
    //mongoose.disconnect();
});

db.once('open', function () {
    console.log("Opened mongoose");
    //mongoose.disconnect();
});

db.once('close', function () {
   console.log("Closed mongoose");
});

//Connect to the database
mongoose.connect(config.connectionString);
//mongoose.connect(config.connectionStringLocal);
