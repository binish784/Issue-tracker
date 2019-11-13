const express= require("express");

const User=require("../models/user");

const auth=require("../middleware/auth");

const router = express.Router();


router.get("/",auth,function(req,res){  
    res.send("Hello To the Homepage");
});

//get all registered users;
router.get("/users", async function(req,res){
    const all_users=await User.find().populate("workspaces");
    return res.send(all_users);
})

module.exports=router;