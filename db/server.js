var http = require('http');

http.createServer(function (req, res) {
  res.write('Hello Tran!');
  res.end();
}).listen(8088);