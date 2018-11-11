// const express = require('express');
// const app = express();
var http = require ('http')

http.createServer(function (request, response ){
    response.writeHead(200, {"Content-Type":"text/plain"})
    response.end("Hello World\n")
}).listen(process.env.PORT)
// app.use(express.static("web-app-navbar/web"))
// app.listen(process.env.PORT || 3007);
