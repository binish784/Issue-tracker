const WorkSpace=require("../models/workspace");
const User=require("../models/user");


//validates if the user is a member of the workspace or not

//if used wth user validation ->verifies if the given user is member
//else if logged in user is a member

const member_validation= async function(req,res,next){
    
    const target_workspace=req.workspace;
    let target_user_id;
    if(req.user){
        target_user_id=req.user._id;
    }else{
        target_user_id=req.session_id;
    }
    
    try{
        const is_member=await WorkSpace.find({_id:target_workspace._id,members:{_id:target_user_id}});
        if(is_member.length!==0){
            next();
        }else{
            return res.send({msg:"Is not a member of the workspace"});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send("SERVER ERROR");
    }
    
}

module.exports=member_validation;