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

app.use("/",require("./routes/api"));




const PORT = process.env.PORT || 5000;

app.listen(PORT,function(err){
    if(err){
        console.log(`SERVER ERROR : PORT ${PORT}`);
    }else{
        console.log(`SERVER LISTENING : PORT ${PORT}`);
    }
})