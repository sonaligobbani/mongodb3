const express = require("express");
const bodyParser = require("body-parser");
const raw = require("body-parser/lib/types/raw");
const app = express();
var prompt = require('prompt-sync')();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://btheory:yqyIQ17nZyBkx1CYOUX3LtkE4GkWcHPo75CPNNv5fF1JGbYa3pl2clLqiSasvJoA6GMBpaNBCNDTJGp4ZKDwCQ%3D%3D@btheory.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@btheory@'

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/new.html");
});


//Creating a database
function database(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Friday");
        dbo.createCollection("Customers", function(err, res) {
          if (err) throw err;
          console.log("Collection created successfully");
          db.close();
        });
    });
}

function records(){
    var pumpkin = [
        { name: 'John', address: 'Highway 71, New York'},
        { name: 'Peter', address: 'Lowstreet 4, San Francisco'},
        { name: 'Amy', address: 'Apple st 652, New York'},
        { name: 'Hannah', address: 'Mountain 21, Princeton'},
        { name: 'Michael', address: 'Valley 345, Princeton'},
        { name: 'Sandy', address: 'Ocean blvd 2, Texas'},
        { name: 'Betty', address: 'Green Grass 1, New York'},
        { name: 'Richard', address: 'Sky st 331, Texas'},
        { name: 'Susan', address: 'One way 98, Princeton'},
        { name: 'Vicky', address: 'Yellow Garden 2, San Francisco'},
        { name: 'Ben', address: 'Park Lane 38, Texas'},
        { name: 'William', address: 'Central st 954, Texas'},
        { name: 'Chuck', address: 'Main Road 989, Washington'},
        { name: 'Viola', address: 'Sideway 1633, San Francisco'}
      ]

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Friday");
        dbo.collection("Customers").insertMany(pumpkin, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
          });
        });
}

function insCommand(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db('Friday');
        var name = prompt('Input a new name : ');
        var add = prompt('Input a new address : ');
        var obj = { name: name, address: add }
        dbo.collection('Customers').insertOne(obj, function(err, res) {
          if (err) throw err;
          console.log("Record inserted successfully");
          db.close();
        });
      });
}



// post method
app.post("/",function(req,res){
  potts = req.body.potts;
  var s = potts.split(' '); 
   console.log(s);
      //var t = potts.split(' ');
    //var t = new Set(t); 
    //t.forEach(convRegex) 
    //console.log(t);
  MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Friday");
      dbo
        .collection("Customers")
        .find({$or: [{name: {$in: s}},{address: {$in: s}}] }) 
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
           db.close();
        });
    });

});



function convRegex(item, index, arr) {
    arr[index] = new RegExp(item);
}



app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});