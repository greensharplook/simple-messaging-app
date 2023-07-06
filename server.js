let http = require('http'),
		url = require('url'),
		fs = require('fs');

let messages = ['testing'];
let clients = [];

http.createServer((req, res) => {
	fs.readFile('./index.html', (err, data) => {
		res.end(data);
	});
}).listen(8080, 'localhost');

console.log('Server running...');