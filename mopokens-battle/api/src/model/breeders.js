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

breederSchema.methods.findUser = function (email, cb) {
    this.model('Breeders').findOne({ 
        email
    }, cb);
}

breederSchema.methods.findByEmail = function (email, password, cb) {
    this.model('Breeders').find({ 
        email,
        password
    }, cb);
}

breederSchema.methods.deleteAll = function (cb) {
    this.model('Breeders').deleteMany({}, cb);
}

//export our module to use in server.js
module.exports = mongoose.model('Breeders', breederSchema);
