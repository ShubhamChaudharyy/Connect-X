const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
	email:{
type:String,
              required:true
	},
	password:{
type:String,
              required:true
	},
	firstname:{
              type:String,
              required:true
	},
	lastname:{
                  type:String,
              required:true
	},
	username:{
  type:String,
              required:true
	}

});
module.exports=mongoose.model('Product',productSchema);