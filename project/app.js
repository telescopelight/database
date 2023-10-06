//정리 나중에
var http = require('http'); 
var fs = require('fs'); 
var url = require('url'); 
var qs = require('querystring');
var bodyParser = require('body-parser');
let express = require("express");
let app = express(); // 반환값 저장
app.use(express.static('assets')); //assets이라는 폴더 사용을 선언함

///
var mysql = require('mysql');
const dbconfig   = require('./assets/js/database.js');
const connection = mysql.createConnection(dbconfig);

// configuration =========================
app.set('port', process.env.PORT || 3000);


app.get('/users', (req, res) => {
  connection.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});


app.listen(3000, function(){
    console.log("App is running on port 3000");
});

//url 라우팅
//main page------------------------------------------------------
//__dirname은 요청하고자 하는 파일 경로를 단축시켜주는 절대경로 식별자
app.get("/", function(req, res){
	var head = 'good';
    res.sendfile(__dirname + "/index.html"); //public 폴더 안의 index.html을 사용
});
app.get("/index.html", function(req, res){
	var head = 'good';
    res.sendfile(__dirname + "/index.html"); //public 폴더 안의 index.html을 사용
});

//side page-------------------------------------------------------
app.get("/generic.html", function(req, res){
    res.sendfile(__dirname + "/generic.html"); //about 페이지
});

app.get("/gallery.html", function(req, res){
    res.sendfile(__dirname + "/gallery.html"); //요소 페이지
});

app.get("/board.html", function(req, res){
    res.sendfile(__dirname + "/writeboard.html"); //요소 페이지
});


//로그인창
//회원가입 창
app.get("/join", function(req, res){
        var title = '회원가입';
        var description = "환영합니다! : )";
        var html = `
        <!doctype html> 
        <html> 
        <head><title>${title}</title> <meta charset="utf-8"></head> 
        <body>
            <h2>회원 가입</h2>
            <form action = "/join_process" method = "post">
            <ul>
                <p> 사용하실 ID  
                <input type = "text" name = "id" placeholder = "id">
                </p>
            </ul>
            <ul>
                <p> 비밀번호  
                <input type = "text" name = "pw" placeholder = "pw">
                </p>
            </ul>
            <ul>
                <p> 비밀번호 확인 
                <input type = "text" name = "pw_check" placeholder = "pw_check">
                </p>
            </ul>
            <p>
                <input type="submit" value = "가입하기">
            </p>
            </form>

        </body> 
        </html>
        `;
	res.writeHead(200);
	res.end(html);
   // res.sendfile(__dirname + "/writeboard.html"); //요소 페이지
});

//mysql 데이타 전송---- mysql 연동할것
app.get("/join_process", function(request, response){

        // join에서 submit 하면 여기에서 데이터를 db로 넘겨주자
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(req){
            var post = qs.parse(body);
            const obj = JSON.parse(JSON.stringify(post)); 
            var keys = Object.keys(obj);
            // for (var i=0; i < keys.length; i++){
            //     console.log(obj[keys[i]]);
            // }
            var mysql = require('mysql');
            // 정보를 담은 파일
			const vals   = require('/js/database.js');
            // 연결을 위한 정보 불러오기
            var con = mysql.createConnection({
                host: vals.Host, port:vals.Port,
                user: vals.user, password: vals.password,
                connectionLimit: 5, database: vals.database
            });

            // 연결되었는지 확인
            con.connect(function(err){
                if (err) throw err;
                console.log("You are connected");
            });
			
			
			
            // 수행하고 싶은 작업(sql문) 
            var sql = 'INSERT INTO Users(id, password) VALUES(?,?)';
            var params = [obj[keys[0]],obj[keys[1]]]
            con.query(sql, params, function(err, rows, fields){
                if(err){
                    console.log(err);
                } else{
                    console.log(rows.name);
                }
            });

            con.end();


            // 전송 후 첫화면으로 돌아간다.
            response.writeHead(302, {Location : `/`});
            response.end();
		});
});
	// res.sendfile(__dirname + "/writeboard.html"); //요소 페이지