const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routers/AuthRouter');
const ProductRouter = require('./Routers/ProductRouter')
//...............................................................................
require('dotenv').config();
require('./Modal/db');
require('./Modal/User');
//...............................................................................
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
//...............................................................................
app.listen(PORT, ()=>{
    console.log(" Server is Runing on Port:", PORT)
})
app.get('/',(req,res)=>{
    res.send("<h1>Sersver is runing properly happy..... Index...</h1>")
})