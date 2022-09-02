const express = require("express");
require("dotenv").config({path:"./config/.env"})
const connectDB = require('./config/connectDB');

connectDB();
const app = express();
//middelware
app.use(express.json());
app.use("/api/user",require("./routes/Auth"))

const PORT = process.env.PORT || 8000 ;

app.listen(PORT,(err)=>{
    err ? console.log(err)
    : console.log(`server is running on port ${PORT}`)
})