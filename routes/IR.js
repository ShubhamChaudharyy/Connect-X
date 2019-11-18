const Product=require('../model/user');
const Story=require('../model/user');
const path = require('path');
const bcrypt=require('bcryptjs');


const express = require('express');

const router = express.Router();
router.get('/achievements/:id',(req,res,next)=>{
Product.findById(req.params.id).then(products=>{
  res.render('achievments',{prods:products});
}).catch(err=>{
console.log(err);
})
	

	
	

})
router.post('/add/projects-detail',(req,res,next)=>{
	const project=req.body.project_name;
	const project_detail=req.body.project_det;
    const project_link=req.body.project_link;
	const prodId=req.body.ID;
	Product.findById(prodId).then(products=>{
		console.log("hello");
		if(products){
			products.project.push({name:project,detail:project_detail,link:project_link});
			
			products.save();
			res.redirect('/profile/'+prodId);
		}
	}).catch(err=>{
		console.log("no data found");
	})
})
router.post('/delete/project',(req,res,next)=>{
	const projectId=req.body.project_id;
	const prodId=req.body.ID;
	
	
		
			Product.findByIdAndUpdate(
				prodId,
				{ "$pull": { "project" : { _id: projectId}}},
				{"new": true }
			).then(()=>{
				res.redirect('/profile/'+prodId)
			}).catch(err=>{
				console.log('pull not working');
			})
			
		
	
	
})
router.post("/addachievement",(req,res,next)=>{
	const achievement=req.body.achievement_detail;


    
	const prodId=req.body.productID;
	Product.findById(prodId).then(products=>{
		if(products)
		{
			products.bucket.push(achievement);
		
			products.save();
			res.redirect('/profile/'+prodId);
		}

	}).catch(err=>{
	  console.log('no records found');
	})
	

})

router.get('/',(req,res,next)=>{
	res.render('landing');
}
);

router.get('/profile/:id',(req,res,next)=>{
	const isLoggedIn=req.get('Cookie')
	const log=isLoggedIn.split('=')[1];

	Product.findById(req.params.id)
	.then(products=>{
		res.render('allcards',{
		 prods:products,
		 isAuth:log,
		 updated:true,
		 justreg:false
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
		 isAuth:true,
		 updated:true,
		 justreg:false
		});
	}).catch(err=>{
		console.log(err);
	})
})
router.post('/delete/achievement',(req,res,next)=>{
	const prodId=req.body.ID;
	const achieve_name=req.body.achievement_detail;

	Product.findById(prodId).then(products=>{
		if(products)
		{
			for( i in products.bucket)
			{
				 if(products.bucket[i]==achieve_name)
				        var index=i;
			}
			var temp;
			temp=products.bucket[i];
			products.bucket[i]=products.bucket[index];
			products.bucket[index]=temp;

			
		   products.bucket.pop();
		   products.save();
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
router.post('/delete/skill',(req,res,next)=>{
	const prodId=req.body.ID;
	const skillname=req.body.specificskill;

	Product.findById(prodId).then(products=>{
		if(products)
		{
			for(i in products.skills)
			{
				 if(products.skills[i]==skillname)
				        var index=i;
			}
			var temp;
			temp=products.skills[i];
			products.skills[i]=products.skills[index];
			products.skills[index]=temp;

			
		   products.skills.pop();
		   products.save();
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
router.get('/saved/personaldetails/:id',(req,res,next)=>{
	const prodId=req.params.id;
	Product.findById(prodId).then(products=>{
		res.render('allcards',{isAuth:true,prods:products,updated:true,justreg:false});
	}).catch(err=>{
		console.log('error')
	})
		

})
router.post('/personaldetails',(req,res,next)=>{
   const name=req.body.name;
   const college=req.body.college;
   const gender=req.body.gender;
   const contact=req.body.contact;
   const stream=req.body.streamname;
   const prodId=req.body.ID;
   
   Product.findById(prodId).then(products=>{
	   if(products)
	   {
		   products.name=name;
		   products.college=college;
		   products.gender=gender;
		   products.contact=contact;
		   products.stream=stream;
		   products.save();
		   res.redirect("/saved/personaldetails/"+prodId);
	   }
   }).catch(err=>{
	   console.log('error');
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
res.render('allcards',{prods:detail,isAuth:true,updated:true,justreg:true});
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
			{   req.session.isLoggedIn=true;
				req.session.products=products;
			    req.session.save();
			    res.redirect('/profile/'+products._id);
			}
			else {
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
router.post('/delete-session',(req,res,next)=>{
	req.session.destroy(err=>{
		console.log(err);
		res.redirect("/");
	})
})


module.exports=router



