//필요한 모듈 들여오기
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session)

//필요한 파일 들여오기
var authRouter = require('./lib_login/auth');
var page = require('./main/main');
var authCheck = require('./lib_login/authCheck.js');
var template = require('./lib_login/template.js');
//글쓰기
var writeRouter = require('./gallery/write');
//var writeTemplate = require('./gallery/template.js')
//글읽기
var readRouter = require('./gallery/read');


const app = express()
const port = 3000

app.use(express.static('./assets'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

app.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  } else {                                      // 로그인 되어있으면 메인 페이지로 이동시킴
    res.redirect('/main');
    return false;
  }
})

// 인증 라우터
app.use('/auth', authRouter);
 
app.get('/main', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  }
	
	res.sendFile(__dirname + "/index.html");
	/*var html = template.HTML('Welcome',
    `<hr>
        <h2>메인 페이지에 오신 것을 환영합니다</h2>
        <p>로그인에 성공하셨습니다.</p>`,
    authCheck.statusUI(req, res)
  );
  res.send(html);*/
})
app.get("/generic.html", function(req, res){
    res.sendfile("generic.html"); //about 페이지
});

app.use('/write', writeRouter);

//갤러리 이동 - 게시판부터 이동하도록
app.get("/gallery.html", function(req, res){
    res.sendfile("/write/bullet_board"); //요소 페이지
});

app.get('/write', function(req, res) {
    res.redirect("/write/writer"); //요소 페이지
	return false;
});

app.get('/bullet_board', function(req, res) {
    res.redirect("/write/bullet_board"); //요소 페이지
	return false;
});
//app.use('/read', readRouter);
/*
app.get('/read', function(req, res) {
	console.log(req.pathname);
    res.redirect("/read_file?id="+req.query.id); //요소 페이지
	return false;
});
*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});