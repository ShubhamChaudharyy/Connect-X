const Product=require('../model/user');
const Story=require('../model/user');
const path = require('path');
const bcrypt=require('bcryptjs');

const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
	res.render('landing');
}
);
router.get('/skillspage/:productId',(req,res,next)=>{
	
	res.render('updateskill',{presentID:req.params.productId,editing:false,SkillAdd:true});
});
router.get('/profile/:id',(req,res,next)=>{
	Product.findById(req.params.id)
	.then(products=>{
		res.render('allcards',{
		 prods:products,
		 isAuth:true
		});
	}).catch(err=>{
		console.log(err);
	})
});
 router.post('/addskill',(req,res,next)=>{
  const updatedskills=req.body.skilldetail;
  const prodId=req.body.productID;
  Product.findById(prodId).then(products=>{
	  if(products)
	  {   
			products.skills.push(updatedskills);
	        products.save();
		  res.redirect('/profile/'+prodId);
	  }
	  else{
		  console.log("no records found");
	  }
	  

  }).catch(err=>{
	  console.log("not working");
  })
  
 

})
router.get('/profile/post-delete/:id',(req,res,next)=>{
	Product.findById(req.params.id)
	.then(products=>{
		res.render('allcards',{
		 prods:products,
		 isAuth:true
		});
	}).catch(err=>{
		console.log(err);
	})
})
router.post('/delete',(req,res,next)=>{
	const prodId=req.body.ID;
	const skillname=req.body.specificskill;
	Product.findByIdAndUpdate(prodId).then(products=>{
		if(products)
		{
		  products.pull({skills:{$in:[skillname]}});
	       res.redirect('/profile/post-delete/'+prodId);
		}
	   else {
		   console.log("no records found");
	   }
	})
    .catch(err=>{
		console.log(err);
	})
	   

});
router.get('/allpeople',(req,res,next)=>{
 res.render('people');
});
router.get('/home',(req,res,next)=>{
res.render('landing');
});
router.get('/register',(req,res,next)=>{
res.render('register',{alreadyreg:false});
});
router.get('/login',(req,res,next)=>{
res.render('logreg',{notpassword:false,notEmail:false});
});
router.post('/intermediate',(req,res,next)=>{
const mail=req.body.email;
const password=req.body.password;

const fname=req.body.fname;
const lname=req.body.lname;
const username=req.body.Username;


Product.findOne({email:mail}).then(products=>{
	if(products)
	{
		res.render('register',{alreadyreg:true});
	}
	return bcrypt.hash(password,12);
	

}).then(hashedPassword=>{


	const detail=new Product({
	firstname:fname,
	lastname:lname,
	username:username,
	email:mail,
	password:hashedPassword


});
 detail.save();
res.render('allcards',{prods:detail,isAuth:true});
})
.catch(err=>{
	console.log('not working');
})
});
router.post('/checkdata',(req,res,next)=>{
const mail=req.body.email;
const pass=req.body.password;

Product.findOne({email:mail})
.then(products=>{
	if(products)
	{  
		bcrypt.compare(pass,products.password).then(doMatch=>{
			if(doMatch)
			{
				console.log("password matched");
			    res.render('allcards',{prods:products,isAuth:true});

			}
			res.render('logreg',{notpassword:true,notEmail:false});
			     
		}).catch(err=>{
			console.log(err);
		})
			
	}
	else{
    	res.render('logreg',{notpassword:false,notEmail:true});
    }
}).catch(err=>{
	console.log('error');
})

      


});


module.exports=router



