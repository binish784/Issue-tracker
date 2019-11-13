const express = require("express");
const cors = require("cors");

const app = new express();

require("dotenv/config");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use("/register",require("./routes/register"));
app.use("/login",require("./routes/login"));

app.use("/workspace",require("./routes/workspace"));
app.use("/",require("./routes/issue"));

app.use("/",require("./routes/api"));


const mongoose=require("mongoose");
const dotenv=require("dotenv");


const PORT = process.env.PORT || 5000;

require("dotenv/config");

mongoose.connect(process.env.USER_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true},function(err){
    if(!err){
        console.log("USER database connected");
    }else{
        console.log("USER database connection failed : ",err);
    }
})

app.listen(PORT,function(err){
    if(err){
        console.log(`SERVER ERROR : PORT ${PORT}`);
    }else{
        console.log(`SERVER LISTENING : PORT ${PORT}`);
    }
})