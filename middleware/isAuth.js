const jwt = require('jsonwebtoken');
const User = require('../model/User');
require("dotenv").config({path:'../config/.env'})

const isAuth = async(req,res,next)=>{
    try {
        const token = req.headers["x-auth-token"]
        //check token
        if(!token){
            return res.status(400).send({msg:"no token unauthorized"})
        }
        //get user by id from payload
        const decoded = await jwt.verify(token,process.env.SecretOrKey);
        const user = await User.findById(decoded.id)
        //check user
        if(!user){
            return res.status(400).send({msg:"unauthorized"})
        }
        //get user
        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({msg:"server errors..."})
    }
}

module.exports = isAuth