var http = require("http");
var fs = require("fs");

var server = http.createServer();
server.on("request", function (request, response) {
    response.setHeader("Content-Type", "text/html, charset=utf-8");
    if (request.method === "GET" && request.url === "/hello") {
        response.write("<h1>Hello world!</h1>");
        response.end();
    } else if (request.method === "GET" && request.url === "/") {
            fs.readFile("index.html", "utf8", function (err, file) {
                if (err) throw err;
                server.on("request", function (request, response) {
                    response.setHeader("Content-Type", "text/html, charset=utf-8");
                    response.end(file);
                });
            });
    } else {
        response.statusCode = 404;
        var img = "./lego.png";
        fs.readFile("/", "utf-8", function(err, img) {
            if (err) throw err;
            server.on("request", function(request, response) {
                response.setHeader("Content-Type", "image/png");
                return response.send(img);
                response.end();
            });
        });
        response.end();
    };
});
server.listen(9000);
