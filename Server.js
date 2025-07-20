const express = require('express');
const app = express()
port = 9000

var cors = require('cors')
 app.use(cors())

 app.use(express.json())
const fs = require('fs')

 const multer = require('multer')

const mystorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./public/Uploads')
  },
  filename: function (req, file, cb) {
    const fname = Date.now() + file.originalname;
    cb(null, fname)
  }
})

const upload = multer({storage: mystorage})
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then(()=>console.log("mongoDB connected!")).catch((e)=>console.log("unable to connect to MOngoDB" + e.message))

const registerschema= mongoose.Schema({name:String, phone:String, Username:{unique:true,type:String}, Password:String }, {versionKey:false})
// schema defines the structure of collection/table in debugger. means the name of columns and its datatypes
const registerModel = mongoose.model("register", registerschema, "register")
//internal collection name,Schemaname, real collection name
app.post("/api/register", async(req, res)=>{
    try{
    const newRecord = registerModel({name:req.body.pname, phone:req.body.phn, Username:req.body.uname, Password:req.body.Pass})
    //record that will be sent to the real db

   const result = await newRecord.save(); //Saving document to real record
   
    if(result)
      {
        res.send({sucess:true})
      }
      else
      {
        res.send({sucess:false})
      }
    }
    catch(e)
    {
      res.send("Error Occured " + e.message)
      console.log(e.message)
    }
})

app.post("/api/login",async(req, res)=>{
    try{
    const result= await registerModel.findOne({Username:req.body.uname , Password:req.body.Pass})
    if(result===null){
        res.send({sucess:0})
    }
    else{
        res.send({success:1})
    }
    }
    catch(e)
    {
        res.send({sucess:-1})
        console.log(e.message)
    }
})
app.get("/api/SearchUser",async(req, res)=>{
    try{
    const result= await registerModel.findOne({Username:req.query.em})
    if(result===null){
        res.send({sucess:0 })
        
    }
    else{
        res.send({sucess:1, udata:result})
    }
    }
    catch(e)
    {
        console.log(e.message)
        res.send({sucess:-1})
        
    }
})

app.get("/api/listofusers",async(req, res)=>{
    try{
    const result= await registerModel.find()
    if(result===null){
        res.send({sucess:0 })
        
    }
    else{
        res.send({sucess:1, udata:result})
    }
    }
    catch(e)
    {
        console.log(e.message)
        res.send({sucess:-1})
        
    }
})
app.delete("/api/deluser",async(req, res)=>{
    try{
    const result= await registerModel.deleteOne()
    if(result===null){
        res.send({sucess:0 })
        
    }
    else{
        res.send({sucess:1, udata:result})
    }
    }
    catch(e)
    {
        console.log(e.message)
        res.send({sucess:-1})
        
    }
})
//API category 
const CategorySchema= mongoose.Schema({Catname:String, Picture:String}, {versionKey:false})
const Catmodel = mongoose.model("category", CategorySchema, "category")

app.post('/api/Savecategory',upload.single('pic'),async(req, res)=>{
     try{
        var imagefile = "Default-pic.jpg"
        if(req.file){
            imagefile = req.file.filename
        }
    const newRecord = Catmodel({Catname:req.body.catname, Picture:imagefile})
   const result = await newRecord.save(); //Saving document to real record
    if(result)
      {
        res.send({sucess:1})
      }
      else
      {
        res.send({sucess:0})
      }
     
    }
    catch(e)
    {
        res.send({sucess:-1})
      console.log( e.message)
      
      
    }
})

app.get("/api/getallcateg",async(req,res)=>{
  const result = await Catmodel.find()
  try{
  if(result.length==0) {
    res.send({success:0})
  }
  else{
    res.send({success:1, cdata:result})
  }
}
catch(e){
  console.log(e.message)
}
})
app.delete('/api/deletecat/:catid',async(req,res)=>{
  const result = await Catmodel.deleteOne({_id:req.params.catid})
  try{
  if(result.deletedCount==1){
    res.send({sucess:1})
  }
  else{
    res.send({sucess:0})
  }
}
catch(e) {
  res.send({sucess:-1})
  console.log(e.message)
}
})
app.put('/api/updatecategory',upload.single('pic'),async(req, res)=>{
     try{
        var imagefile
        if(req.file){
            imagefile = req.file.filename
            if(req.body.oldpic!=="Default-pic.jpg"){
              fs.unlinkSync(`${req.file.destination}/${req.body.oldpic}`);
            }
        }
        else{
          imagefile=req.body.oldpic;
        }
   
   const result = await Catmodel.updateOne({_id:req.body.cid},{Catname:req.body.catname, Picture:imagefile}); //Updating
   console.log(result)
    if(result.modifiedCount==1)
      {
        res.send({sucess:1})
      }
      else
      {
        res.send({sucess:0})
      }
     
    }
    catch(e)
    {
        res.send({sucess:-1})
      console.log( e.message)
      
      
    }
})

//product DB
const ProductSchema= mongoose.Schema({Catid:String, Productname:String, Rate:Number, Discount:Number, featured:String,Stock:String, Description:String, Picture:String}, {versionKey:false})
const Productmodel = mongoose.model("products", ProductSchema, "products")

app.post('/api/Saveproducts',upload.single('pic'),async(req, res)=>{
     try{
        var imagefile = "Default-pic.jpg"
        if(req.file){
            imagefile = req.file.filename
        }
    const newRecord = Productmodel({Catid:req.body.catid,Productname:req.body.prod, Rate:req.body.rate, Discount:req.body.dis, featured:req.body.Feat,Stock:req.body.stock, Description:req.body.descrep, Picture:imagefile})
   const result = await newRecord.save(); //Saving document to real record
    if(result)
      {
        res.send({sucess:1})
      }
      else
      {
        res.send({sucess:0})
      }
     
    }
    catch(e)
    {
        res.send({sucess:-1})
      console.log( e.message)
      
      
    }
})

app.listen(port,()=> {
    console.log(`app is listening at port ${port}`)
}
)