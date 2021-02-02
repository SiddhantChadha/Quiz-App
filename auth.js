const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {signupValidation,loginValidation} = require("./validation")


router.post("/",async function(req,res){
	
	const {error} = signupValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message)
	
	
	const userExist = await User.findOne({username:req.body.username});
	if(userExist) return res.status(400).send("Username already exists");
	
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password,salt);
	
	const user = new User({
		username:req.body.username,
		password:hashedPassword,
		email:req.body.email,
		name:req.body.name
		
	});
	
	try{
		const savedUser =  user.save();
		const token =jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
		//res.header("auth-token",token);
		//res.status(200).send("hi");

        res.setHeader('auth-token', token);
		res.status(200).send("signup successful");
	}catch(err){
		res.status(400).send(err);
}
});



module.exports = router;