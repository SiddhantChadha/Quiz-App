const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors"); 

(async () => {
  try{
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Connected to DB");
  }catch(e){
    console.log(e.message)
}})();



//importing Routes
const signupRoute = require("./Routes/auth")
const loginRoute = require("./Routes/login")
//const leaderboard = require("./Routes/leaderboard")
const game = require("./Routes/game")
const history = require("./Routes/history")
const user = require("./Routes/user")

app.use(express.json());
app.use(cors());

//Route Middlewares
app.use("/signup",signupRoute)
app.use("/login",loginRoute)
//app.use("/leaderboard",leaderboard)
app.use("/game",game)
app.use("/history",history)
app.use("/user",user)



app.listen(process.env.PORT,() => console.log("Server has started"));