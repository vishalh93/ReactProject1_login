const mongoose = require('mongoose');
const url = process.env.mongoose_url;

mongoose.connect(url)
.then(()=>{
    console.log(" Connected to Data base succesfully .........")
})
.catch((err)=>{
    console.log("Error Because DB is not connected",err)
})

module.exports = mongoose;
