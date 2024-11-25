const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    let fileName;
    if (q.pathname === '/') {
        fileName = './index.html';
    }
    else if (q.pathname === '/about' || q.pathname === '/contact-me') {
        fileName = '.' + q.pathname + '.html';
    }
    else {
        fileName = './404.html';
    }
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(fileName, (error, data) => {
        (fileName === './404.html') ? res.statusCode = 404 : res.statusCode = 200;
        res.write(data) ;
        return res.end();
    });
});

const hostname = '127.0.0.1';
const port = 8080
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})