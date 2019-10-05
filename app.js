var express=require('express');
var app=express();
var Product=require('./model/user')
var mongoose=require('mongoose');
const mongoConnect=require('./util/database').mongoConnect;
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/img'));

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const allroutes=require("./routes/IR");

app.use(allroutes);



mongoose.connect(
    'mongodb+srv://shubham:159+357+555@neocode-wsaw6.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }
  )
.then(result=>{
	console.log('connected 101');
app.listen(3000);
})
.catch(err=>{
	console.log(err);
})
