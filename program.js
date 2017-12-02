var http = require("http");
var fs = require("fs");

var server = http.createServer();
server.on("request", function (request, response) {
    response.setHeader("Content-Type", "text/html, charset=utf-8");
    if (request.method === "GET" && request.url === "/hello") {
        response.write("<h1>Hello world!</h1>");
        response.end();
    } else if (request.method === "GET" && request.url === "/hei") {
            fs.readFile("index.html", "utf8", function (err, file) {
                if (err) throw err;
                response.setHeader("200", "Content-Type", "text/html, charset=utf-8");
                response.end(file);
            });
    } else {
        response.statusCode = 200;
        response.setHeader("Content-Type", "image/png")
        fs.readFile("./lego.png", "utf-8", function(err, img) {
            if (err) throw err;
            response.end(img);
        });
    }
});
server.listen(9000);
