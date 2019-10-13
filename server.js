var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('static'));  
app.use(express.urlencoded({ extended: false }))
.use(express.json());

const fs = require('fs');
const sys = require('sys');
  
app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  


function SaveData(char,data){

  if (!fs.existsSync('data/'+ char)){
    fs.mkdirSync('data/' + char);
  }
  require("fs").writeFile("data/"+ char + '/' + Date.now().toString() + ".png", data, 'base64', function(err) {
    console.log(err);
  });

}

app.post('/image_data',function(req,res){
  console.log("POST method");
  console.log("Character",req.body);
  img_data = req.body.imgData;
  tchar = req.body.tchar;
  // var base64Data = img_data.replace(/^data:image\/\w+;base64,/, "");
  SaveData(tchar,img_data.replace(/^data:image\/\w+;base64,/, ""));
  res.end('ok');
})
var server = app.listen(8000, function () {  
  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
  
})  
