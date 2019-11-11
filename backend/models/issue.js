const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const issueSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    status:{
        type:Number,
        required:true,
        default:0,
    },
    issued_by:{
        type:Schema.type.ObjectId,
        ref:"Users",
        required:true,
    },
    workspace:{
        type:Schema.Types.ObjectId,
        ref:"Workspaces",
        required:true,
    }
})

module.exports=mongoose.model("Issues",issueSchema);