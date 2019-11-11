const WorkSpace=require("../models/workspace");

const member_validation= async function(req,res,next){
    
    const target_user=req.user;
    try{
        const is_member=await WorkSpace.find({members:{_id:target_user._id}});
        if(is_member.length!==0){
            next();
        }else{
            return res.send({msg:"Is not a member"});
        }
    }catch(err){
        console.log(err);
        return res.status(500).send("SERVER ERROR");
    }
    
}

module.exports=member_validation;