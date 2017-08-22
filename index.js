//Mongo
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017/robots";
const data = require("./data");

//Express
const express = require ("express");
const app = express ();
//Mustache
const mustacheExpress = require("mustache-express");
app.engine("mustache", mustacheExpress());
app.set("views", "./views")
app.set("view engine", "mustache")
app.use(express.static("public"))

//Mongo connections
  MongoClient.connect(uri)
    .then(function(db){
      return db.collection("users").findOne({"job":null}); //pulls in first present but won't work with find. Need to be able to display it
    })
    .then(function(result){
      console.log(result);
    })


app.get('/user', function (req, res) {
  res.render("user", data);
});

app.get("/jobs", function (req,res){
  res.render("jobs", data);
})


app.get('/user/:id', function (req,res){
  let userId= req.params.id-1;
  let user = data.users[userId];
  res.render('user', user);
});

app.listen(3000, function () {
  console.log('The robots are coming');
})
