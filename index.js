// Using ES6 imports which is applicable only with Node.js 12.*.*
import { createServer } from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
// OR import path from 'path';

// const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;

const getTimestamp = date => ({
	unix: date.getTime(),
	utc: date.toUTCString()
});

const server = createServer((req, res) => {
	if (req.url === '/') {
		fs.readFile('./views/index.html', (err, data) => {
			if (err) {
				console.error('There was an error reading the file!', err);
				return;
			}
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data);
		});
	}	else if (req.url.match('\.css$')) {
		const __dirname = dirname(fileURLToPath(import.meta.url));
		// OR const __dirname = path.dirname(new URL(import.meta.url).pathname);
		let cssPath = /*path.*/join(__dirname, req.url);
		const readStream = fs.createReadStream(cssPath);
		res.writeHead(200, {'Content-Type': 'text/css'});
		readStream.pipe(res);
	} else if (req.url.startsWith('/api/timestamp')) {
		const dateString = req.url.split('/api/timestamp/')[1];
		let timestamp;
		if (dateString === undefined || dateString.trim() === "") {
			timestamp = getTimestamp(new Date());
		} else {
			const date = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);
			if (!isNaN(date.getTime())) {
				timestamp = getTimestamp(date);
			} else {
				timestamp = {
					unix: 'null',
					utc: 'Invalid Date'
				};
			}
		}
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(timestamp));
	}	else {
		fs.readFile('./views/404.html', (err, data) => {
			if (err)
				console.error('Page not found', err);
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.end(data);
		});
	}
});

server.listen(port, () => {
	console.log(`server running on PORT ${server.address().port}`);
});
/* OR
server.listen(port, hostname, () => {
	console.log(`server running at http://${hostname}:${port}/`);
});
*/