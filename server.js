let http = require('http'),
		url = require('url'),
		fs = require('fs');

let messages = ['testing'];
let clients = [];

http.createServer((req, res) => {
	res.end('Test!!!');
}).listen(8080, 'localhost');

console.log('Server running...');