require("dotenv/config");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


const auth=(req,res,next)=>{
    const secret=process.env.SECRET;
    if(!req.headers["authorization"]){
        return res.status(403).send({msg:"No authorization token"});
    }
    try{
        const token=req.headers["authorization"].split(" ")[1];
        jwt.verify(token,secret, async function(error,authData){
            if(error){
                return res.status(403).send({msg:"invalid authorization token"});
            }
            req.id=authData._id;
            req.session_id=authData._id;
            await User.findById(req.id,function(err,user){
                if(!user){
                    return res.status(400).send({msg:"Not a valid user"});
                }   
            next();
            })
        });
    }catch(err){
        if(err){
            console.log(err);
            return res.status(500).send("SERVER ERROR");
        }
    }
}

module.exports=auth;