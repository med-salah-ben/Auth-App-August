const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config({path:'../config/.env'})

const User = require('../model/User');
const {validator,registerRules,loginRules} = require('../middleware/validator');
const isAuth = require('../middleware/isAuth');



//register
router.post("/register",registerRules(),validator, async(req,res)=>{
    try {
        const {name , lastName , email , password} = req.body ;
        //simple validation
        // if( !name || !email || !password || !lastName){
        //     return res.status(400).send({msg:"please check required fields"})
        // }
        //check if user already exist ???
        let user = await User.findOne({email})
        if(user){
            return res.status(400).send({msg:"user already exist...."})
        }
        user = new User({name,lastName,email,password})

        //create salt and hash
        const salt = 10 ;
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword;
        //save
        await user.save();
        //jwt config 
        const payload = {
            id :user._id
            }
        //token
        const token = await jwt.sign(payload,process.env.SecretOrKey, { expiresIn: '1h' })
        res.status(200).send({msg:"user register with success",user ,token})
    } catch (error) {
        res.status(500).send({msg:"server errors.."})
    }
})

//Login
router.post('/login',loginRules(),validator,async(req,res)=>{
    try {
        const {email , password} = req.body;
        //check
        // if( !email || !password){
        //     return res.status(400).send({msg:"please enter all fields"})
        // };
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).send({msg : "User does Not exist"})
        };
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
           return res.status(400).send({msg:"Bad credentials password"})
        }
                //jwt config 
                const payload = {
                    id :user._id
                    }
                //token
                const token = await jwt.sign(payload,process.env.SecretOrKey, { expiresIn: '1h' })
        
        res.send({msg:'logged with success',user , token}).status(200)
    } catch (error) {
        res.status(500).send({msg:"server errors...."})
    }
})

//private routes
router.get('/user',isAuth,(req,res)=>{
    res.status(200).send({user:req.user})
})

module.exports = router