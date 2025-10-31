const jwt = require ('jsonwebtoken');
const AuthEnsureController = (req,res,next)=>{
    const AuthData = req.headers['authorization'];       // Yeh Hamesha small latter me hi rahega 

    //...................condition ............................
    if(!AuthData){
        return res.status(403)
        .json({
            messege : 'Unauthorized ,jwtToken is required '   // working
        })
    }
    //...................... try and catch apply ..........................
    try{
        const decoded = jwt.verify( AuthData, process.env.JWT_SECRET)
            req.user = decoded;
            next();
    }catch(error)
        {
            return res.status(403)
            .json({
                messege: ' Unauthorised ,JWT Token is Invalid or Expired '
            })
        }
}
module.exports = AuthEnsureController;