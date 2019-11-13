const WorkSpace=require("../models/workspace");

// validates if the workspace exists or not
// requires workspace_id as an parameter in URL

const workspace_validation= async function(req,res,next){
    
    try{
        const workspace_id=req.params.id;
        //validate workspace exist
        const target_workspace=await WorkSpace.findOne({"_id":workspace_id}).populate("members").populate("issues");
        if(!target_workspace){
            return res.status(400).send({msg:"Not a valid workspace"});
        }
        req.workspace=target_workspace;
        next();
    }
    catch(err){
        return res.status(400).send({msg:"Not a valid workspace"});
    }

}

module.exports=workspace_validation;