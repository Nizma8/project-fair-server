const mongoose = require("mongoose")
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDb Atlas connected successfully with pfServer");
}).catch(err=>{
 console.log("MongoDb connection failed"+ err);
})