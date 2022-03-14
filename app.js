const express = require("express");
const { userInfo } = require("os");
const app = express();

app.use(express.urlencoded());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(process.env.PORT || 3000, (req, res)=>{
    console.log("server running on port 3000");
});