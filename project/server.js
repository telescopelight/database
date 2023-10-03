//https 모듈 담기
const http = require('http');
const url = require('url');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('./assets/css'));
app.use(express.static("./images"));

//http 모듈로 서버 생성
var app = http.createServer(function(request, respond){
	//요청이 들어오면 응답
	//콘텐츠는 텍스트, html 형식
	const path = url.parse(request.url, true).pathname; //url에서 패스 추출
	if (request.method === 'GET'){
		if (path === '/') { //주소가 /index라면
			respond.writeHead(200, {'Content-Type':'text/html'}); //헤더설정 
			fs.readFile(__dirname+'/index.html', (err, data) => {
				//파일 읽는 메소드
				if (err){
					return console.log(err); // 에러처리
				}
				respond.end(data, 'utf-8'); //브라우저 전송
			});
		}
		
		else if (path === '/about'){
			//주소가 /이면
			response.writeHead(200, {'Content-Type':'text/html'});
			fs.readFile(__dirname + '/about.html', (err, data) => {
				if (err){
					return console.log(err); // 에러처리
				}
				respond.end(data, 'utf-8'); //브라우저 전송
			});
		}
		
		else{
      respond.statusCode = 404; // 404 상태 코드
      respond.end('주소가 없습니다');
		}
	}

//listen 함수로 서버 실행
})
app.listen(3000);