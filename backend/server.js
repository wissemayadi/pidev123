const express= require("express")
const user = require("./route/user"); //route user
var cors = require('cors')

require('dotenv').config({path:'./config/.env'})
const connectDB= require('./config/connectDB');


const app=express();
app.use(cors())

app.use(express.json())
app.use("/api/user",user);




connectDB();

app.listen(process.env.PORT,(err)=>{
    err
        ? console.log(err)
        : console.log(`the server is running on ${process.env.PORT}`);
})
