//Mongo
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/robots";
// const data = require("./data");

//Express
const express = require ("express");
const app = express ();

//Mustache
const mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache")
app.use(express.static("public"))

let users =

//NOTE  DO NOT UNCOMMENT
// MongoClient.connect(url)
//   .then(function(db){
//     return db.collection("users").insertMany(data.users)
//   })
//   .then(function(result){
//     console.log(result);
//   });


//Unemployed
app.get("/jobs", function(req, res){
  MongoClient.connect(url)
    .then(function(db){
      return db.collection("users").find({job:null}).toArray(function(err, doc){
        // console.log(doc);
        res.render("jobs", {robot:doc});
      }); //pulls in first present but won't work with find. Need to be able to display it
      db.close();
    });
  });

  //Employed
  app.get("/employed", function(req, res){
    MongoClient.connect(url)
      .then(function(db){
        return db.collection("users").find({job: {$ne: null}}).toArray(function(err, doc){
          // console.log(doc);
          res.render("employed", {robot:doc});
        }); //pulls in first present but won't work with find. Need to be able to display it
        db.close();
      });
    });


// app.get('/jobs', function(req, res) {
//   MongoClient.connect(url, function(err, db) {
//     let robots = db.collection("users");
//     robots.find({job: null}).toArray(function(err, docs) {
//       res.render("jobs", {robot: docs});
//     });
//     db.close();
//
//   });
// });

// app.get('/user', function (req, res) {
//   res.render("user", data);
// });


// app.post("/jobs", function (req,res){
//   return db.collection("users").findOne({"job":null});
//   res.redirect("jobs", data.users);
// })


app.get('/user/:id', function (req,res){
  let userId= req.params.id;
  let user = url.users[userId];
  MongoClient.connect(url)
  .then(function(db){
    return db.collection("users").find().toArray(function(err, doc){
      res.render('user', {robot:doc});
    }); //pulls in first present but won't work with find. Need to be able to display it
    res.render('user', user);
  })
  db.close();
});

app.listen(3000, function () {
  console.log('The robots are coming');
});
