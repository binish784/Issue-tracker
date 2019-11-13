const mongoose=require("mongoose");

const Schema=mongoose.Schema;


//criticality
//0 - low , 1-medium, 2-high, 3 -red alert

//status
//0-open , 1-on progress, 2- closed


const issueSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    criticality:{
        type:Number,
        required:true,
        default:1,
    },
    status:{
        type:Number,
        required:true,
        default:0,
    },
    issued_by:{
        type:Schema.Types.ObjectId,
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