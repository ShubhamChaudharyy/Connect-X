var express=require('express');
var app=express();
var session=require('express-session');
var Product=require('./model/user')
const MongoDbStore=require('connect-mongodb-session')(session);
const MONGODB_URI='mongodb+srv://shubham2610:shubham9910@neocode-wsaw6.mongodb.net/test';
var mongoose=require('mongoose');

mongoose.set('useFindAndModify', false);
const mongoConnect=require('./util/database').mongoConnect;
const store=new MongoDbStore({
  uri:MONGODB_URI,
  collection:'sessions'
})
app.use(session
  (
  {secret:'my secret',
  resave:false,
  saveUninitialised:false,
  store:store}
  )
  )


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/img'));

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const allroutes=require("./routes/IR");

app.use(allroutes);



mongoose.connect(
    'mongodb+srv://shubham2610:shubham9910@neocode-wsaw6.mongodb.net/test',{ useNewUrlParser: true }
  )
.then(result=>{
	console.log('connected 101');
app.listen(3000);
})
.catch(err=>{
	console.log(err);
})
