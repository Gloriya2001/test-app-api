const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")

let app = express()

app.use(express.json())//to handle json objects
app.use(cors())//security purpose

mongoose.connect("mongodb+srv://gloria2001:gloria2001@cluster0.ipg35w1.mongodb.net/testappdb?retryWrites=true&w=majority&appName=Cluster0")
//connnects our system and mongo cloud
app.post("/signup", async(req,res)=>{

    let input = req.body //collecting input
    //passting to model and here password should be encrypted
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password = hashedPassword
    console.log(input)

    userModel.find({email:req.body.email}).then(
        (items)=>{
            if (items.length>0) {
                res.json( {"status":"email id already exist"} )
            } else {
                let result = new userModel(input)//input pass to result
                result.save()//input saves to the db
                //await is using becoz we storing it into mongodb
                res.json({"status":"success"})    
            }  
        }
    ).catch(
        (error)=>{}
    )

    
})

app.listen(3030,()=>{
    console.log("Sever Started")
})