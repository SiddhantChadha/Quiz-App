const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {signupValidation,loginValidation} = require("./validation")




router.post("/",async function(req,res){
	
	const {error} = loginValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message)
	
	
	const user = await User.findOne({username:req.body.username});
	if(!user) return res.status(404).send("Username doesn't exist");
	
	
	const validPass = await bcrypt.compare(req.body.password,user.password);
	if(!validPass) return res.status(400).send("Invalid Password");
	
	const token =jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
	res.status(200).header("auth-token",token).send();
});



module.exports = router;