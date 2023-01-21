const express = require("express");
const bodyParser = require("body-parser");
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const mongoose = require("mongoose");
var React = require('react');
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://Ben:test123@cluster0.hcq9y6f.mongodb.net/servicesDB2", {useNewUrlParser: true});
// ?retryWrites=true&w=majority

var search = require('./search-service-data');
var DisplaySearchResults = require("./DisplaySearchResults");
var ReactDomServer = require('react-dom/server');

const serviceSchema = {
  title: String,
  content: String
}
const Service = mongoose.model("Service",serviceSchema);
app.set ('view engine' , 'ejs')
app.route('/Service')
.get(function(req, res) {
 Service.find(function(err, foundServices){
  if(!err){
    res.send(foundServices);
  } else{
    res.send(err); 
  }
 }); 
})
.post(function(req, res){
  const newService = new Service({
    title: req.body.title,
    content: req.body.content
    
  });
  newService.save(function(err){
    if (!err ){
      res.send("The service was posted nicely"); 
    } else {
      res.send(err);
    }
  }); 
})
.delete()



// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://OBenjOne:<Indiglo3>@cluster0.rowxq1w.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/index", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/service-options", function (req, res) {
  res.sendFile(__dirname + "/public/pages/service-options/service-options.html");
});

app.get("/service-create", function (req, res) {
  res.sendFile(__dirname + "/public/pages/service-create/service-create.html");
});


app.get("/service-search", function (req, res) {
  
  var keyword = req.query.keyword;
  var filter = req.query.filter;
  // perform the search using the keyword and filte
  filteredData = search.filterData(keyword);
  // res.render(DisplaySearchResults({ results: filteredData }));
  // res.sendFile(__dirname +'/public/index.html')
  
  // var html = ReactDomServer.renderToString(React.createElement(DisplaySearchResults, { results: filteredData }));
  // res.send(html);
});



// app.post("/services", function (req, res) {
//     console.log(req.query.search)
//     // this is synchronous, which I believe means it will get slow with heavy site traffic?
//     const jsonData = require('./services.json'); 
//     //a temporary system for getting json data, later this should read from Muhammed's database
//     console.log('services request')
//     res.send(jsonData); 
// });
app.get("/Services" , function(req,res) {
  res.render("services")
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
  });