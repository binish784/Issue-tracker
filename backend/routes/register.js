const express= require("express");
const joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const router =express.Router();

const User = require("../models/user");

const secretKey=process.env.SECRET;

const registerForm=joi.object({
    username:joi.string().min(5).required(),
    email:joi.string().required().email(),
    password:joi.string().required()
})

router.get("/",function(req,res){
    res.send("User Registration");
})

router.post("/", async function(req,res){
    const request=registerForm.validate(req.body);
    if(request.error){
        return res.status(400).send(request.error.details[0].message);
    }

    let {username,email,password}= req.body;

    try{
        let user=await User.find({email});
        if(user.length!==0){
            return res.status(400).send({msg:"User already exists"});
        }
        user= new User({
            username,
            email,
            password
        })

        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt);

        await user.save();

        const payload={
            _id:user._id,
            email:user.email
        }


        jwt.sign(payload,secretKey,{expiresIn:"60s"},function(err,token){
            if(err) throw err;
            res.send({token:"Bearer "+token});
        })

    }catch(err){
        console.log(err);
        res.status(500).send("SERVER ERROR");
    }

})


module.exports=router;