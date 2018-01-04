'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mopokens = require('./mopokens.js');
var mopokenSchema = mongoose.model('Mopokens').schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var breederLevelSchema = new Schema({
 email: String,
 mopokens: [mopokenSchema],
});

breederLevelSchema.methods.findByEmail = function (email, cb) {
    this.model('BreederLevels').findOne({ 
        email
    }, cb);
}

breederLevelSchema.methods.update = function (condition, newData, options, cb) {
    this.model('BreederLevels').findOneAndUpdate({ 
        condition,
        newData,
        options,
    }, cb);
}

//export our module to use in server.js
module.exports = mongoose.model('BreederLevels', breederLevelSchema);