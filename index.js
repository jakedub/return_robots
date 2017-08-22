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

app.get('/user', function (req, res) {
  res.render("user", realData);
});

app.get('/template/:id', function (req,res){
  let id= req.params.id;
  let user = data.users[id];
  res.render('user', user);
});

app.listen(3000, function () {
  console.log('The robots are coming');
})

//Mongo connections
  MongoClient.connect(uri)
    .then(function(db){
      return db.collection("users").insertMany(data.users);
    })
    .then(function(result){
      console.log(result);
    })
