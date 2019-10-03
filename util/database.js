


const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = () => {
  MongoClient.connect(
    'mongodb+srv://shubham:159+357+555@neocode-wsaw6.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }
  )
    .then(result => {
      console.log('Connected!');
      _db=result.db();
      
    })
    .catch(err => {
      console.log(err);
    });
};
const getdb=()=>{
	if(_db)
	{
		return _db;

	}
	throw 'No Database found'
}
exports.mongoConnect=mongoConnect;
exports.getdb=getdb;
