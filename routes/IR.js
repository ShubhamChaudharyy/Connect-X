const Product=require('../model/user');
const path = require('path');
const bcrypt=require('bcryptjs');

const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
	res.render('landing');
}
);
router.get('/skillspage/:productsId',(req,res,next)=>{
  res.render('updateskill')
});
router.get('/profile',(req,res,next)=>{
	Product.find()
	.then(products=>{
		res.render('allcards',{
         prods:products
		});
	})
});
 router.post('/addskill',(req,res,next)=>{
  const skill=req.body.skill;
  const prodId=req.body.ObjectId;
  console.log(prodId);

})
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
	{   const password=products.password;
		Product.findOne({password:pass}).then(products=>{
		if(products)
		{ 
			res.render('allcards',{prods:products,isAuth:true});
			 
		}
		else{
			res.render('logreg',{notpassword:true,notEmail:false});
		}

	})
}
	else{
    	res.render('logreg',{notpassword:false,notEmail:true});
    }
}).catch(err=>{
	console.log('error');
})

      


});


module.exports=router;
// /admin/add-product => POST


