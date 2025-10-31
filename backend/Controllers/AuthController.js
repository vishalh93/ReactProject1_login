const bcrypt = require('bcrypt');
const UserModel = require('../Modal/User');
const jwt = require('jsonwebtoken');
//........................................signup Logic .........................................
const signup = async (req,res)=>{
            try{
                const{ name,email,password,mobile } = req.body;                    console.log("Req Body Data : ", req.body);
                        //...........................................................
                                const user = await UserModel.findOne({ email });
                                if(user){
                                        return res.status(409)
                                        .json({ 
                                            message:"User Already Exists you can Login now : ",
                                            success:false
                                            }); 
                                        }
                        //.............................................................
                 const userModel = new UserModel({ name, email, password,mobile });            // console.log(" User Modal Data is : ", userModel);
                 userModel.password = await bcrypt.hash(password,10);                // console.log("Hashed PW is :", userModel.password)
                  
                    await userModel.save();                                       // console.log(" User Signedup Successfully :",userModel) 
                    res.status(201)
                    .json({ message: "User Is Signup Successfully " , success:true});

            }    //...................................................................................................................
            catch(err){
                res.status(500)
                .json({ message:"Internal Server Erorr occurred ...... Signup Failed ",success:false })
            }
        }
    const login = async (req,res)=>{
        //console.log(" Login se aane wali requiest body data is in .......:", req.body);
        try{
            const { email,password } = req.body;                // console.log(" Login Request Body Data is .................: " ,req.body);
            const user = await UserModel.findOne({ email });    // console.log("Email found function  is working :",user)
            //.....................................Not found email .............................
            if(!user){
                return res.status(403)
                .json({ message: " Email is Invalid Login Failed :", success:false});
            }
            //.....................................Password not match ............................
            const isPassEqual = await bcrypt.compare(password, user.password);
            // console.log("Is equal variable is matching .....:",isPassEqual);       // true
            if(!isPassEqual){
                return res.status(403)
                .json({ message: " Password is Invalid login Failed :", success:false})
            }
            //...............................JWT Token Create and Sending Response  ........................................
           
           const jwtToken = jwt.sign(
                                    { email: user.email, _id: user._id },
                                    process.env.JWT_SECRET,
                                    { expiresIn: '12h' } // Correct spelling here >>> yaha per galti ho gayi thee <<<<
                                );

//console.log('JWT WORKING........', jwtToken);

                        res.status(200).json({
                            message: 'User Logged In Successfully', // Corrected string with proper quotes
                            success: true,
                            jwtToken,
                            email,      // >>>>>>>>> yaha per bhi galti ho gayi thee <<<<<<<<<<
                            name: user.name
                        });
            //....................................................................................
        }catch(err){
            res.status(500)
            .json({ message: " Internal Server Error Occurred ...... Login Failed...... ", success:false });
           // console.log(" Catch error in Login Controller is :",err);
        }
    }    
       
//module.exports = signup;
 module.exports = {signup,login};