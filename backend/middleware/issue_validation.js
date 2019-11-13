const Issue=require("../models/issue");

//validates if the issue exists or not

//requires issue_id as paramter

const issue_validation=async function(req,res,next){
    const issue_id=req.params.issue_id;
    try{
        Issue.findOne({_id:issue_id}).exec(function(err,issue){
            if(!issue){
                return res.send({msg:"Issue not found"});
            }
            req.issue=issue;
            next();
    
        });
    }catch(err){
        console.log(err);
        return res.send("SERVER ERROR");
    }
}

module.exports=issue_validation;
