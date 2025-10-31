const Joi = require('joi');
const signupValidation = (req,res,next)=>{
    const schema = Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required(),
        mobile:Joi.string().min(10).max(10).required(),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message: "Bad Request",error})     // This is working
    }
    next();
}

const loginValidation = (req,res,next)=>{        
    //console.log(" Login Validation data :",req.body);
    //....................................................
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(100).required()
    })
    //....................................................
    const {error} = schema.validate(req.body);
    //console.log("Login Validation Eror in Middlewear is :",error);
    if(error){
        return res.status(400)
        .json({message: " Bad Request :",error})
    } next();

}

module.exports = {signupValidation,loginValidation};