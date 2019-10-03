const Product=require('../model/user');
const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
	res.render('landing');
}
);
router.get('/profile',(req,res,next)=>{
	res.render('allcards');


});
router.get('/allpeople',(req,res,next)=>{
 res.render('people');
});
router.get('/home',(req,res,next)=>{
res.render('landing');
});
router.get('/register',(req,res,next)=>{
res.render('register');
});
router.get('/login',(req,res,next)=>{
res.render('logreg');
});
router.post('/intermediate',(req,res,next)=>{
const fname=req.body.fname;
const lname=req.body.lname;
const username=req.body.Username;
const detail=new Product({
	firstname:fname,
	lastname:lname,
	username:username


});
detail.save()
.then(result=>{
console.log('created database');
console.log(detail);
res.redirect('/');
})
.catch(err=>{
	console.log(err);
})
});
module.exports=router;
// /admin/add-product => POST


