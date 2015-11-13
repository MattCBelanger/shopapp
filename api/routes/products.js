var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	
	

	

	models.Products.findAll().then(function(succ){
     	console.log(succ);
     	
     	 if(succ.length>0){
     	 	
     	 	console.log(succ);
			console.log("test");
     		res.json(succ);
    		 }
     	
     },function(err){
     	console.log(err);
     	console.log("error");
     	res.json("err");
     });


});

router.post('/:id',function(req,res){
	//edit
	models.Products.findAll().then(function(products){
		res.json({
			products:products
		});
	});
});


router.put('/',function(req,res){
	
		console.log(req.body.data);

		var postData = JSON.parse(req.body.data);

	models.Products.create({
		name: postData.name,
		description:postData.description,
		category:postData.category,
		image:postData.image,
		quantity:postData.quantity,
		price:postData.price,
		status:postData.status
		
	}).then(function(products){
		console.log(products);
		res.json(products);
	},function(err){
		console.log(err);
     	console.log("error");
     	res.json(err);
	});
});


module.exports = router;