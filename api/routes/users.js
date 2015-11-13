var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/',function(req,res){

		console.log(req.body.data);

		var postData = JSON.parse(req.body.data);
		console.log(postData);
		var username = postData.username;
		var pass = postData.password;

	models.Users.findAll({
		where: {
		    email: username,
		    password:pass
		  }
     }).then(function(succ){
     	//console.log(succ);
     	
     	 if(succ.length>0){
     	 	var data = {
     	 		authToken:"Nice"
     	 	}
     	 	console.log("yo");
//pbject has it func
     	res.send(data);
     }else{
     	var data = {
     	 		authToken:"Invalid Credentials"
     	 	}
     		console.log("yo2");
     		res.send(data);
     }
     	
     },function(err){
     	console.log(err);
     	console.log("error");
     	res.send("err");
     });
});

router.get('/test',function(req,res){
     
     var user_object = {
          email:"test@email.com",
          password:'123'
     };
     models.Users.create(user_object).then(function(users){
          res.json({users:users})
     });


});

module.exports = router;