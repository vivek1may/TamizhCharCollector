var express = require('express');  
var app = express();  

app.use(express.static('static'));  
fs = require('fs');
sys = require('sys');
  
app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  
app.get('/process_get', function (req, res) {  
response = {  
       first_name:req.query.first_name,  
       last_name:req.query.last_name  
   };  
   console.log(response);  
   res.end(JSON.stringify(response));  
})

app.get('/image_data',function(req,res){
  console.log("GET method");
  console.log(req.query);
  img_data = req.query.imgData;
  var base64Data = img_data.replace(/^data:image\/\w+;base64,/, "");
  require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
    console.log(err);
  });
})
var server = app.listen(8000, function () {  
  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
  
})  