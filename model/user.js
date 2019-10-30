const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({
	email:{
              type:String
           
	},
	password:{
              type:String
              
	},
	firstname:{
              type:String
             
	},
	lastname:{
              type:String
             
	},
	username:{
              type:String
            
    },
    skills:{
        type:String
    }

    

});




module.exports=mongoose.model('Product',userSchema);
module.exports = mongoose.model('Story', storySchema);
