const express = require('express');
const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://localhost:27017')
.then(()=>{
    console.log("mongoDB is connected")
})
.catch((e)=>{
    console.log("DB is not connected");
})

app.listen(800, ()=>{
    console.log("server is running at port 8000");
})