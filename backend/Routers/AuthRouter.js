const {signupValidation,loginValidation} = require('../Middlewers/AuthValidation');
 const {signup,login} = require('./../Controllers/AuthController');

const router = require('express').Router();
router.post('/signup',signupValidation,signup)             // signupValidation,signup   write karenge

router.post('/login',loginValidation,login);


// router.post('/login',(req,res)=>{
//     res.send("Login working ........")
// })

// router.post('/signup',(req,res)=>{
// res.send("Signup successfully ....");                    // if (req.body) {console.log(" This SignUp Api") } 
//                                                         // else { console.log("Signup Not Working"); }
// })

module.exports = router;