//index.js
var mysql = require('mysql')
let express = require("express");
const db_config = require("/workspace/database/config/database.js")();
let app = express();

const connection = db_config.init();
db_config.test_connection(connection);
app.use(express.static('assets')); //assets이라는 폴더 사용을 선언함

app.listen(3000, function(){
    console.log("App is running on port 3000");
});

//main page------------------------------------------------------
app.get("/", function(req, res){
    res.sendfile("index.html"); //public 폴더 안의 index.html을 사용
});
app.get("/index.html", function(req, res){
    res.sendfile("index.html"); //public 폴더 안의 index.html을 사용
});

//side page-------------------------------------------------------
app.get("/generic.html", function(req, res){
    res.sendfile("generic.html"); //about 페이지
});

app.get("/gallery.html", function(req, res){
    res.sendfile("gallery.html"); //요소 페이지
});

app.get("/board.html", function(req, res){
    res.sendfile("board.html"); //요소 페이지
});