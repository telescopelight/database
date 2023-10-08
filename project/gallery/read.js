var express = require('express');
var router = express.Router();

var readTemplate = require('./readTemplate.js');
var template = require('./template.js');
var db = require('./db');

//글 읽어오기 프로세스
router.get('/reader', function(request, response){

	//쿼리 
//db에서 데이타 받아오기
	db.query(`SELECT*FROM textline_beta WHERE id=?`,[request.query],function(error, data){
          // topic id중 queryData.id값과 일치하는 데이터를 가져와 topic에 담음
            if(error){throw error;}
		
            var html = readTemplate.HTML(data.title, data.user,data.text,'');
		
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
module.exports = router;