const router = require("express").Router();
const User = require("../Model/User");
const verifyToken = require("../verifyToken")

router.post("/",verifyToken,async (req,res) =>{

	const game = {
		category : req.body.category,
		score: req.body.score,
		date : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
	}
	
	User.findOneAndUpdate(
		{_id:req.user._id},

		{
			$inc : {totalScore:game.score},
			$push : {games : game},

		},
		{new:true},
		function(err,result){
			if(err) return res.status(400).send(err)
			
			 else return res.status(200).send(result);
		}
	);
	
})

module.exports = router;