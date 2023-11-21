//to env file
require('dotenv').config()

// import express

const express =require('express')

// import cors

const cors = require ('cors')

// impor

const router = require("./Routes/routes")
// tp create express server
 require('./DB/connection')
const pfServer = express()

// use cors
pfServer.use(cors())

// we must have to parse json data using server

pfServer.use(express.json())

// use router

pfServer.use(router)

// customise port number

const PORT = 4000 || process.env.PORT

// to run the server application use listen()
pfServer.use('/uploads',express.static('./uploads'))

pfServer.listen(PORT,()=>{console.log(`PROJECT FAIR SERVER STARTED AT PORT :${PORT}` );})

// resolve request to localhost:4000

pfServer.get('/',(req,res)=>{
  res.send("PROJECT FAIR STARTED")
})



