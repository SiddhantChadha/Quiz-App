const router = require("express").Router();
const User = require("../Model/User");
const verify = require("../verifyToken");

router.get("/",verify,async (req,res)=>{
	
	const user = await User.findOne({_id:req.user._id});
	if(!user) return res.status(404).send("User not found");
	
	res.status(200).json(user);

})

router.post("/",verify,function(req,res){
	
	User.findOneAndUpdate(
		{_id:req.user._id},
		{
			avatarCode:req.body.avatarCode
		},
		{new:true},
		function(err,result){
			if(err) return res.status(400).send(err);
			
			 else return res.status(200);
		}
	);

})


module.exports = router;
