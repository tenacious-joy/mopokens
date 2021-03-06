//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var bodyParser = require('body-parser');
var Breeder = require('./model/breeders');
var Mopokens = require('./model/mopokens');
var BreederLevels = require('./model/breederLevels');
var mongoose = require('mongoose');
var db;
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;
var username = process.env.npm_package_config_username;
var password = process.env.npm_package_config_password;

console.log("process",process.env.npm_package_config_myPort);
//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
var uri = "mongodb://"+username+":"+password+"@ds239137.mlab.com:39137/mopokens";
mongoose.connect(uri, function(err, database) {
    
    if(err) throw err;

    db = database;
  
    // Start the application after the database connection is ready
    app.listen(port, function() {
        console.log(`api running on port ${port}`);
    });
      
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

router.route('/breeders')
 //retrieve all comments from the database
 .get(function(req, res) {
    console.log("Getting all breeders");
    Breeder.find(function(err, breeders) {
        console.log(err);
        console.log(JSON.stringify(breeders));
 if (err)
 res.send(err);
 //responds with a json object of our database comments.
 res.json(breeders)
 });
 });
 //post new comment to the database
 router.route('/register')
 .post(function(req, res) {
 var breeder = new Breeder();
 //body parser lets us use the req.body
 breeder.firstName = req.body.firstName;
 breeder.lastName = req.body.lastName;
 breeder.email = req.body.email;
 breeder.password = req.body.password;

 breeder.save(function(err) {
 if (err) {
 res.send(err);
 }
 var breederLevels = new BreederLevels();
    breederLevels.email = req.body.email;
    breederLevels.mopokens = req.body.mopokens;
    breederLevels.save(function(err, mopokens) {
 if (err) {
 res.send(err);
 }
 res.json(mopokens);
 });
 });
 });

 router.route('/findEmail')
 .post(function(req, res) {
    var breeder = new Breeder();
    breeder.findUser(req.body.email, function (err, user) {
         if (err) {
            res.send(err);
         }
         res.send({user});
     });
 });

 router.route('/login')
 .post(function(req, res) {
    var breeder = new Breeder();
    breeder.findByEmail(req.body.email, req.body.password, function (err, user) {
         if (err) {
            res.send(err);
         }
         res.json({ user });
     });
 });

//  router.route('/addMopoken')
//  .post(function (req, res) {
//      var mopokens = new Mopokens();
//      mopokens.type = req.body.type;
//      mopokens.level = req.body.level;
//      mopokens.save(function (err) {
//          console.log("saving..."+mopokens.type+mopokens.level);
//          if(err) {
//              console.log(err);
//              res.send(err);
//          }
//          res.json({message: 'mopoken added successfully'});
//      });
//  });

 router.route('/mopokens')
 //retrieve all comments from the database
 .get(function(req, res) {
    console.log("Getting all types");
    Mopokens.find(function(err, mopokens) {
        console.log(err);
 if (err)
 res.send(err);
 //responds with a json object of our database comments.
 res.json(mopokens);
 });
 });

 router.route('/saveUserLevels')
 //retrieve all comments from the database
 .post(function(req, res) {
    console.log("Saving user levels");
    var breederLevels = new BreederLevels();
    breederLevels.email = req.body.email;
    breederLevels.findByEmail(breederLevels.email, function (err, breeder) {
        if(err) {
            res.send(err);
        }
        breeder.mopokens = req.body.mopokens;
        breeder.save((err, savedBreeder) => {
            if (err) {
                res.send(err);
            }
            res.send(savedBreeder);
        })
    });
//     breederLevels.update({email: breederLevels.email}, 
//         {$set:{mopokens:breederLevels.mopokens}},
//         {new: true, upsert: true, returnNewDocument: true},
//     function(err, mopokens) {
//         console.log(err);
//  if (err)
//  res.send(err);
//  //responds with a json object of our database comments.
//  res.json(mopokens);
//  });
 });

 router.route('/getBreederLevels')
 .get(function (req, res) {
     var breederLevel = new BreederLevels();
     breederLevel.findByEmail(req.query.email, function (err, breederLevels) {
        if (err) {
           res.send(err);
        }
        res.json(breederLevels);
    });
 });

 router.route('/deleteAll')
 .delete(function(req,res) {
    var breeders = new Breeder();
    breeders.deleteAll(function(err) {
        if(err) {
            res.send(err);
        }
        res.send({message: 'deleted successfully'});
    });
 });

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests
