"use strict";

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var PORT = process.env.PORT || 30002; // Read HTML templates from file and send them via request

var sendTemplate = function sendTemplate(res, template) {
  _fs.default.readFile(_path.default.join(__dirname + template), function (err, html) {
    if (err) throw err;
    res.writeHeader(200, {
      "Content-Type": "text/html"
    });
    res.write(html);
    res.end();
  });
}; // Create an HTML server


_http.default.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  var url = req.url; // Home page

  if (url === '/') sendTemplate(res, '/templates/index.ejs'); // About page
  else if (url === '/about') sendTemplate(res, '/templates/about.ejs'); // Otherwise 404 page
    else sendTemplate(res, '/templates/404.ejs');
}).listen(PORT);