var express = require('express');
var router = express.Router();

var boardTemplate = require('./boardTemplate.js');
var readTemplate = require('./readTemplate.js');
var template = require('./template.js');
var db = require('./db');

// 로그인 화면
router.get('/writer', function (request, response) {
    var html = template.HTML(`
<!--글쓰기 폼 -->
	<h3>Form</h3>
	<form method="post" action="/write/writer_process">
		<div class="row gtr-uniform">
			<div class="col-6 col-12-medium">
				<input type="text" name="title" id="demo-name" value="title" placeholder="title" />
			</div>
			
			<!-- Break -->
			<div class="col-12">
				<input type="text" name="username" id="demo-name" value="name" placeholder="Name" />
			</div>
			
			<!-- Break
			<div class="col-4 col-12-small">
				<input type="radio" id="demo-priority-low" name="demo-priority" checked>
				<label for="demo-priority-low">Low</label>
			</div>
			<div class="col-4 col-12-small">
				<input type="radio" id="demo-priority-normal" name="demo-priority">
				<label for="demo-priority-normal">Normal</label>
			</div>
			<div class="col-4 col-12-small">
				<input type="radio" id="demo-priority-high" name="demo-priority">
				<label for="demo-priority-high">High</label>
			</div>
			 -->
			<!-- Break
			<div class="col-6 col-12-small">
				<input type="checkbox" id="demo-copy" name="demo-copy">
				<label for="demo-copy">Email me a copy</label>
			</div>
			<div class="col-6 col-12-small">
				<input type="checkbox" id="demo-human" name="demo-human" checked>
				<label for="demo-human">I am a human</label>
			</div>
			-->
			
			<!-- Break -->
			<div class="col-12">
				<textarea name="message" id="demo-message" placeholder="Enter your message" rows="6"></textarea>
			</div>
			<!-- Break -->
			<div class="col-12">
				<ul class="actions">
					<li><input type="submit" value="Send Message" class="primary" /></li>
					<li><input type="reset" value="Reset" /></li>
				</ul>
			</div>
		</div>
	</form>
        `, '');
    response.send(html);
});

//글쓰기 프로세스
router.post('/writer_process', function(request, response) {
    var username = request.body.username;
    var title = request.body.title;
    var message = request.body.message;    
		
    db.query('INSERT INTO textline_beta (user, title, textline) VALUES(?,?,?)', [username, title, message], function (error, data) {
        if (error) throw error;
        response.send(`<script type="text/javascript">alert("글쓰기가 완료되었습니다!");
        document.location.href="/";</script>`);
    });
});


//글목록 불러오기 프로세스
router.get('/bullet_board', function(request, response){

//db에서 데이타 받아오기
		db.query(`SELECT*FROM textline_beta`, function(error, data){
    // topic 데이터 가져오고 topics에 담음
    	if(error){throw error;}
      // 데이터를 가져오지 못하면 error를 던져서 애플리케이션을 중지 시킴
			
		db.query(`SELECT last_insert_id() as textline_beta`,function(error2, last){
      // 마지막 데이터 불러오기
		if(error2){throw error2;}
		//마지막 리스트 불러오기
			
		var list = boardTemplate.list(data);
		var html = boardTemplate.HTML(list,`
			
				 `,''); 
			//
    response.send(html);
			
	
	/*
        db.query('SELECT * FROM textline_beta', function(error, results) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                request.session.is_logined = true;      // 세션 정보 갱신
                request.session.nickname = username;
                request.session.save(function () {
                    response.redirect(`/`);
                });
            } else {              
                response.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
                document.location.href="/auth/login";</script>`);    
            } */
	
});
		});
	

router.get('/reader', function(request, response){

	//쿼리 
//db에서 데이타 받아오기
	var id = request.query.id;
	console.log(id);
	db.query(`SELECT*FROM textline_beta WHERE id=?`,[id],function(error, data){
          // topic id중 queryData.id값과 일치하는 데이터를 가져와 topic에 담음
            if(error){throw error;}
			console.log(data);
			var title = data[0].title;
			var user = data[0].user;
			var textline = data[0].textline;

            var html = readTemplate.HTML(title, user, textline,'');
		
			//
    response.send(html);
	});
	
	/*
        db.query('SELECT * FROM textline_beta', function(error, results) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                request.session.is_logined = true;      // 세션 정보 갱신
                request.session.nickname = username;
                request.session.save(function () {
                    response.redirect(`/`);
                });
            } else {              
                response.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
                document.location.href="/auth/login";</script>`);    
            } */
	
});
}); module.exports = router;