require('dotenv').config()
const express = require("express");
const cors = require("cors");
const router = require('./routes/router')
require('./config/db')

const autoJobServer = express();

autoJobServer.use(cors());

autoJobServer.use(express.json());

autoJobServer.use(router);


const PORT = 3000;

autoJobServer.listen(PORT,()=>{
    console.log('autojob Server has started and waiting for client request!!!');
    
})

autoJobServer.get('/',(req,res)=>(
    res.status(200).send(`<h1>Autojob Server </h1>`)
))
