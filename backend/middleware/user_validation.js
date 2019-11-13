const User=require("../models/user");

// validate user is registered or not
// requires user_email in json body

const user_validation= async function(req,res,next){
    
    try{
        //validate user exist
        const user_email= req.body.email;
        if(!user_email){
            return res.status(400).send({msg:"User email required"});
        }
        const target_user=await User.findOne({email:user_email}).populate("workspaces");
        if(!target_user){
            return res.status(400).send({msg:"Not a valid user email"});
        }
        
        req.user=target_user;

        next();
    }
    catch(err){
        return res.status(400).send({msg:"Not a valid user"});
    }

}

module.exports=user_validation;