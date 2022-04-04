const { RandomObjectGenerator } = require('./modules/generator');
const http = require('http');
const fsp = require('fs').promises;
const path = require('path');

const server = http.createServer( async (req, res) => {
    const myUrl = new URL(req.url, 'http://${req.headers.host}/');
    const pathname = myUrl.pathname;
    if (pathname === '/favicon.ico') {
        return;
    } else if (pathname === '/generate') {
       res.writeHead(200, {'Content-Type': 'application/json'});
       const randomObjectGenerator = new RandomObjectGenerator();
       const allRandomObjects = randomObjectGenerator.generateObjects();
       res.end(allRandomObjects);
    } else if (pathname === '/' || pathname === '/homepage') {
        const homepage = await fsp.readFile('./views/homepage.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(homepage);
    } else if (pathname === '/download-file'){
        const fs = require('fs');
        let file = fsp.readFile( path.join(__dirname,'public/files/randomObjects.txt'));
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', 'attachment; filename=randomObjects.txt');
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-Disposition': 'attachment; filename=randomObjects.txt'
        });
        res.end(await file, 'binary');
    } else if (/\.(jpg)$/i.test(req.url)) {
        const image = await fsp.readFile(`${req.url.slice(1)}`);
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(image);
    } else if (/\.(css)$/i.test(req.url)) {
        const css = await fsp.readFile(`${req.url.slice(1)}`);
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(css);
    } else if (/\.(js)$/i.test(req.url)) {
        const js = await fsp.readFile(`${req.url.slice(1)}`);
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.end(js);
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1 style ="text-align:center; margin:300px"> Page Not Found.</h1>');
    }
});

server.listen(3000);