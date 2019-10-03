const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
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