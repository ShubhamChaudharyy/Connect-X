var express=require('express');
var app=express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/img'));
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const allroutes=require("./routes/IR");

app.use(allroutes);


app.listen("3000",function(){
	console.log("server is listening");
});