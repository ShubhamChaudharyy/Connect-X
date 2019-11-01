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
    skills:[{type:String
	}],
	name:{
		type:String
	  
	 },
	 college:{
		type:String
	  
},
     contact:{
		type:String
	  
},
 gender:{
	type:String
  
},
stream:{
	type:String
  
}

    

});





module.exports=mongoose.model('Product',userSchema);

