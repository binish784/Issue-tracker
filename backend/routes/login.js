const express=require("express");
const Joi = require("@hapi/joi");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

const router = new express();

const User=require("../models/user");

const loginSchema=Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().required()
})

router.get("/",function(req,res){
    res.send("Welcome to login page");
})

router.post("/", async function(req,res){
    const request=loginSchema.validate(req.body);
    if(request.error){
        return res.status(400).send(request.error.details[0].message);
    }
    const {email,password} = req.body;
    let user_password=null;
    let _id=null;
    try{
    
    await User.findOne({email}, async function(err,user){
        if(err){
            throw err;
        }
        if(!user){
            return res.status(403).send({msg:"Email not registered"});
        }
        _id=user._id;
        user_password=user.password;
        const authorized= await bcrypt.compare(password,user_password);

        if(!authorized){
            return res.status(403).send({msg:"Incorrect Password"});
        }
        jwt.sign({_id,email},process.env.SECRET,{expiresIn:"60m"},function(err,authToken){
            if(err){
                throw err;
            }
        return res.send({Token:"Bearer " + authToken});
        });

    
    })  

    }catch(error){
        console.log(error);
        return res.status(500).send("SERVER ERROR");
    }
})

module.exports=router;