const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URL

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas Database Connected Successfully");
    
}).catch(error=>{
    console.log("Database Connection Failed");
    console.log(error);
    
    
})