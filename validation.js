const Joi = require("@hapi/joi");

const signupValidation = function(data){
	
	const schema = Joi.object({
		
		username:Joi.string().required(),
		password:Joi.string().required(),
		email:Joi.string().required().email(),
		name:Joi.string().required(),
	});
	return schema.validate(data)
};

const loginValidation = function(data){
	
	const schema = Joi.object({
		
		username:Joi.string().required(),
		password:Joi.string().required(),
	});
	return schema.validate(data)
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;