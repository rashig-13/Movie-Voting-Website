const express=require('express')
const mongoose=require('mongoose')
const authrouter=require('./routes/auth')
const {ATLAS_URI}=require('./key')

const app=express();

const port=5000;
app.use(express.json())

const uri=ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true})

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb database connection established successfully")
})

app.use('/',authrouter)

app.listen(port,()=>{
    console.log("Server is running");
})