const express= require("express");


const User=require("../models/user");
const WorkSpace=require("../models/workspace");
const Issue=require("../models/issue");

const auth=require("../middleware/auth");
const workspace_validation=require("../middleware/workspace_validation");
const user_validation=require("../middleware/user_validation");
const member_validation=require("../middleware/member_validation");
const issue_validation=require("../middleware/issue_validation");

const router = express.Router();


//get all issues in workspace
router.get("/:id/issues",
    auth,
    workspace_validation,
    member_validation,
    async function(req,res){  
        const target_workspace=req.workspace;
        res.send(target_workspace.issues);
    }
);


// add issue to workspace
router.post("/:id/issues",
    auth,
    user_validation,
    workspace_validation,
    member_validation,
    async function(req,res){
        const target_user=req.user;
        const target_workspace=req.workspace;

        try{
            const title=req.body.title;
            const criticality=req.body.criticality || 1;
            const status=req.body.status || 0;
            const new_issue=new Issue({
                title,
                criticality,
                status,
                "issued_by":target_user,
                "workspace":target_workspace,
            })
            target_user.issues.push(new_issue);
            target_workspace.issues.push(new_issue);
            await new_issue.save();
            await target_workspace.save();
            await target_user.save();
            return res.send({msg:"Issue has been recorded"});

        }catch(err){
            console.log(err);
            return res.send("SERVER ERROR");
        }        
    }
)

//get a single issue
// issue_id as parameter

router.get("/:id/issues/:issue_id",
    auth,
    workspace_validation,
    member_validation,
    issue_validation,
    async function(req,res){
        const issue=req.issue;
        return res.send(issue);
    }
)

//update status of a issue
//requires issue_id paramter/ status in body

router.put("/:id/issues/:issue_id",
    auth,
    workspace_validation,
    member_validation,
    issue_validation,
    async function(req,res){
        const issue=req.issue;
        const status=req.body.status;
        try{
            if(!status){
                return res.send({msg:"Status is required"});
            }
            if(typeof status!=="number"){
                return res.send({msg:"Status must be a number from 0-2"});
            }
            if(!(status>=0 && status<=2)){
                return res.send({msg:"Invalid value for status"});
            }
            issue.status=status;
            await issue.save();
            return res.send({msg:"Status has been changed"});
        }catch(err){
            console.log(err);
            return res.send("SERVER ERROR");
        }
        
    }    
)


module.exports=router;