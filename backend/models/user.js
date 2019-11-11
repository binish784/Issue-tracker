const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const userSchema=Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    workspaces:[
        {
            type:Schema.Types.ObjectId,
            ref:"WorkSpaces",
        }
    ],
    issues:[
        {
            type:Schema.Types.ObjectId,
            ref:"Issues",
        }
    ]
})

module.exports=mongoose.model("Users",userSchema);