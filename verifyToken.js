const jwt = require("jsonwebtoken");

function validate(req,res,next){
	
	const token = req.header("auth-token");
	if(!token) return res.status(401).send("Acess Denied");
	
	
	try{
		const verified = jwt.verify(token,process.env.TOKEN_SECRET);
		console.log(verified);
		req.user = verified;
		next();
	}catch(err){
		res.status(400).send("invalid Token");
	}
	
}

module.exports = validate;