const express =require("express");
const Joi = require("@hapi/joi");

const router=express.Router();

const User=require("../models/user");
const WorkSpace=require("../models/workspace");

const auth=require("../middleware/auth");
const workspace_validation=require("../middleware/workspace_validation");
const user_validation=require("../middleware/user_validation");
const member_validation=require("../middleware/member_validation");

const WorkSpaceSchema=Joi.object({
    name:Joi.string().required(),
})

//get all workspace of logged user

router.get("/",auth,async function(req,res){
    try{
        const workspaces=await User.findById(req.id).populate("workspaces");
        res.send(workspaces.workspaces);
    }catch(err){
        console.log(err);
        res.status(500).send("SERVER ERROR");
    }
})

// add workspace
router.post("/",auth,async function(req,res){
    const request=WorkSpaceSchema.validate(req.body);
    if(request.error){
        return res.status(400).send(request.error.details[0].message);
    }
    
    try{ 

        //validate workspace already exist
        const {name}=req.body;
        const workspace_exists=await WorkSpace.find({name});
        if(workspace_exists.length!==0){
            return res.status(400).send({msg:"Workspace already exists"});
        }

        //validate if user exists

        const user=await User.findById(req.id);
        if(!user){
            return res.status(400).send({msg:"User does not exist"});
        }

        //create new workspace / save workspace
        const new_workspace=new WorkSpace({
            name,
            creator:user
        });

        await new_workspace.save();

        // push workspace to user / save user
        await user.workspaces.push(new_workspace);
        user.save();
        res.send({mgs:"New Workspace Added"})

    }catch(err){
        console.log(err);
        return res.status(500).send("SERVER ERROR");
    }

})

//add users to workspace
router.post("/:id/user",
    auth,
    workspace_validation,
    user_validation,
    async function(req,res){
    try{

        const target_workspace=req.workspace;
        const target_user=req.user;

        //push user to workspace / save
        target_user.workspaces.push(target_workspace);
        target_workspace.members.push(target_user);
        await target_workspace.save();
        await target_user.save();
        return res.send({msg:"User added to workspace"});

    }catch(err){
        console.log(err);
        res.send("SERVER ERRROR")
    }
    
})

//remove user from workspace
router.delete("/:id/user",
    auth,
    user_validation,
    workspace_validation,
    member_validation,
    async function(req,res){
        const target_user=req.user;
        const target_workspace=req.workspace;

        if(req.session_id!=target_workspace.creator._id){
            return res.send({msg:"You do not have administrative rights"})
        }

        //issues (Check if user is an member of workspace or not); 
        //11/8

        try{


            target_workspace.members.pull(target_user._id);
            target_user.workspaces.pull(target_workspace._id);
            await target_workspace.save();
            await target_user.save();
            return res.send({msg:"User removed from workspace"});
        }catch(err){
            console.log(err);
            return res.status(500).send("SERVER ERROR");
        }
    }
)

// add issues to workspace

router.post(":id/issues",
    auth,
    user_validation,
    workspace_validation,
    member_validation,
    async function(req,res){
    const target_user=request.user;
    const target_workspace=request.workspace;
    
    try{

        //push user to workspace / save
        target_user.issues.push(target_workspace);
        target_workspace.members.push(target_user);
        await target_workspace.save();
        await target_user.save();
        return res.send({msg:"User added to workspace"});

    }catch(err){
        console.log(err);
        return res.send("SERVER ERROR");
    }
    
})

module.exports=router;