const express= require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

const User=require("../models/user");

require("dotenv/config");

const auth=require("../middleware/auth");

const router = express.Router();


mongoose.connect(process.env.USER_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true},function(err){
    if(!err){
        console.log("USER database connected");
    }else{
        console.log("USER database connection failed : ",err);
    }
})

router.get("/",auth,function(req,res){  
    res.send("Hello To the Homepage");
});

//get all registered users;
router.get("/users", async function(req,res){
    const all_users=await User.find().populate("workspaces");
    return res.send(all_users);
})


module.exports=router;