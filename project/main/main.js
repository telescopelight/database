var express = require('express');
var router = express.Router();
var template = require('./template.js');


// 로그인 화면
router.get('/index', function(request, response) {
    var title = 'telescopelight';
    var html = template.HTML(title,``, '');
    response.send(html);
});

module.exports = router;