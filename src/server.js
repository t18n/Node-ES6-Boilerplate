import http from 'http';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 30002;

// Read HTML templates from file and send them via request
const sendTemplate = ( res, template ) => {
  fs.readFile(path.join(__dirname + template), (err, html) => {
    if (err) throw err;
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });
};

// Create an HTML server
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const url = req.url;

  // Home page
  if (url === '/') sendTemplate(res, '/templates/index.html');

  // About page
  else if (url === '/about') sendTemplate(res, '/templates/about.html');

  // Otherwise 404 page
  else sendTemplate(res, '/templates/404.html');

}).listen(PORT);
