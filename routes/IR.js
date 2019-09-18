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
module.exports=router;
// /admin/add-product => POST


