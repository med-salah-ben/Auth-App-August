const mongoose = require("mongoose");
const {connect} = mongoose;
require("dotenv").config({path:"./.env"});

const connectDB = async ()=>{
    try {
        await connect(process.env.MongoURI)
        console.log("DataBase Connected....")
    } catch (error) {
        console.log(`database failed to connect ${error}`)
    }
}
module.exports = connectDB