'use strict';

//const person = require('./person');
//const Person = require('./person');
//const person1 = new Person('Chris', 25);

//person1.greeting();

/*
const Logger = require('./logger');

const logger = new Logger();
logger.on('message', (data) => {
    console.log("Called Listener:", data);
});

logger.log('Hello World');
*/

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    /*
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end(content);
        });
    }

    if (req.url === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.end(content);
        });
    }

    if (req.url === '/api/users') {
        const users = [
            { name: 'Lucy Hamilton', age: 40 },
            { name: 'Delilah Rosebottom', age: 29 }
        ];
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    */

    //build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    //get extension of file
    let extname = path.extname(filePath);

    // initial content type
    let contentType = 'text/html';

    //check ext and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //read file 
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                //page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {

                });
            } else {
                //some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            //success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

//this will look for environment port or is not available 5000.
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Sever is running on port ${PORT}`));