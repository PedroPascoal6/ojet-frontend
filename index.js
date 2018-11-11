const express = require('express');
//var webAppNavBar = require('web-app-navbar');
const app = express();

// var http = require ('http')
//
// http.createServer(function (request, response ){
//     response.writeHead(200, {"Content-Type":"text/plain"})
//     response.end("Hello World\n")
//     webAppNavBar.start()
//     app.use(express.static("web-app-navbar/web"))
//     app.listen(process.env.PORT || 3007);
// }).listen(process.env.PORT)
app.use(express.static("web-app-navbar/web"))
app.listen(process.env.PORT || 3007);
