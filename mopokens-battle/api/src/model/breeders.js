'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var breederSchema = new Schema({
 firstName: String,
 lastName: String,
 email: String,
 password: String
});

breederSchema.methods.findByEmail = function (email, password, cb) {
    this.model('Breeders').find({ 
        email,
        password
    }, cb);
}

//export our module to use in server.js
module.exports = mongoose.model('Breeders', breederSchema);
