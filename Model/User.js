const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	
	username:{
		type: String,
		required : true
		
	},
	password:{
		type:String,
		required : true
	},
	email:{
		type:String,
		required:true
	},
	totalScore:{
		type:Number,
		default : 0
	},
	games : {
		type: Array,
		default: [],
	},
	
	name:{
		type:String,
		required:true
	},
	
	avatarCode:{
		type:Number
	}
},{collection:'users'});

module.exports = mongoose.model("User",userSchema)