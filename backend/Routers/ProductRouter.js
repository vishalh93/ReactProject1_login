const AuthEnsureController = require('../Middlewers/AuthEnsureController');
const router = require('express').Router();

console.log('Product router is working');

router.get('/',AuthEnsureController,(req,res)=>{
    //console.log('....Logged in user detail.....',req.user);
    res.status(200).json([
        {
            name : "Mobile",
            price : 8000
        },
        {
            name: "TV",
            price: 15000
        },
        {
            name: "Laptop",
            price: 45000
        }
    ])
})
module.exports = router;