let http = require('http'),
		url = require('url'),
		fs = require('fs');

let messages = ['testing'];
let clients = [];


http.createServer((req, res) => {
	let url_parts = url.parse(req.url);

	if (url_parts.pathname === '/') {
		fs.readFile('./index.html', (err, data) => {
			res.end(data);
		});

	} else if (url_parts.pathname === '/client.js') {
		fs.readFile('./client.js', (err, data) => {
			res.end(data);
		});

	} else if (url_parts.pathname.substr(0, 5) === '/poll') {
		let count = Number(url_parts.pathname.replace(/[^0-9]*/, ''));

		if (messages.length > count) {
			res.end(JSON.stringify({
				counter: messages.length,
				append: messages.slice(count).join('\n') + '\n'
			}));

		} else {
			clients.push(res);
		}

	} else if (url_parts.pathname.substr(0, 5) === '/msg/') {
		let msg = unescape(url_parts.pathname.substr(5));
		messages.push(msg);
		while (clients.length > 0) {
			let client = clients.pop();
			client.end(JSON.stringify({
				counter: messages.length,
				append: msg + '\n'
			}));
		}

	} else {
		res.end();
	}

}).listen(8080, 'localhost');

console.log('Server running...');