const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const workspaceSchema= Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    members:[
        {
            type:Schema.Types.ObjectId,
            ref:"Users",
        }
    ],
    issues:[
        {
            type:Schema.Types.ObjectId,
            ref:"Issues",
        }
    ]
})

module.exports=mongoose.model("WorkSpaces",workspaceSchema);
