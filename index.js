const express = require("express");
const app =express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors"); 



mongoose.connect(process.env.DB_CONNECTION,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false	
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));



//importing Routes
const signupRoute = require("./Routes/auth")
const loginRoute = require("./Routes/login")
const leaderboard = require("./Routes/leaderboard")
const game = require("./Routes/game")
const history = require("./Routes/history")
const user = require("./Routes/user")

app.use(express.json());
app.use(cors());

//Route Middlewares
app.use("/signup",signupRoute)
app.use("/login",loginRoute)
app.use("/leaderboard",leaderboard)
app.use("/game",game)
app.use("/history",history)
app.use("/user",user)



app.listen(process.env.PORT,process.env.IP,() => console.log("Server has started"));