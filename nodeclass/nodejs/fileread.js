const fs = require('fs');

fs.readFile("read.txt", 'utf8',function(err, data) {
	console.log(data);
});