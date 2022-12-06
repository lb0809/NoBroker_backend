var express = require("express");
const cors = require("cors"); //for cross origin requests
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

var mongoose = require("mongoose");
const dbURI='mongodb+srv://lakshya:lakshya@cluster0.s7ezzzn.mongodb.net/test';

mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) =>  app.listen(5000 ))
.catch((err)=>console.log(err));

let db= mongoose.connection;


app.get("/", (req, res) => {
    res.send("yo");
});
app.get("/clear", (req, res) => {
    db.dropCollection('NoBroker', function(err, result) {});
    res.send("yo");
});
app.get('/fetchall',(req,res)=>{
    console.log("jk")
    db.collection('NoBroker').find({}).toArray(function(err,data){
        console.log(data)
        res.send(data)
        
    })
})
app.post("/adduser", (req, res) => {
    // db.dropCollection('NoBroker', function(err, result) {});
    var d = req.body;
    console.log(d)
    var data={
        c:d
    }
    db.collection('NoBroker').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    res.json(data)
});
