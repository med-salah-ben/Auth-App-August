const {body , validationResult} =require('express-validator');

const registerRules = ()=>[
    body('name',"name is required").notEmpty(),
    body('lastName',"Last Name is required").notEmpty(),
    body('email',"email should be email").isEmail(),
    body('password',"password must contain 5 car").isLength({
        min:5,
        max:20
    })
]

const loginRules = ()=>[
    body('email',"email should be email").isEmail(),
    body('password',"password must contain 5 car").isLength({
        min:5,
        max:20
    })
]

const validator = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send({errors:errors.array()})
        return;
    }
    next()
}

module.exports = {validator, loginRules,registerRules}