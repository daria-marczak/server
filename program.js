var http = require("http");
var fs = require("fs");

var server = http.createServer();
server.on("request", function(request, response) {
    response.setHeader("Content-Type", "text/html, charset=utf-8");
    if (request.method === "GET" && request.url === "/hello") {
        response.write("<h1>Hello world!</h1>");
        response.end();
    } else if (request.method === "GET" && request.url === "/hei") {
        fs.readFile("index.html", "utf8", function(err, file) {
            if (err) throw err;
            response.setHeader("200", "Content-Type", "text/html, charset=utf-8");
            response.write(file);
            response.end();
        });
    } else {
        response.statusCode = 404;
        response.writeHead(200, {
            "Content-Type": "image/png"
        })
        fs.readFile("./lego.png", "binary", function(err, img) {
            if (err) throw err;
            response.write(img, "binary");
            response.end();
        });
    }
});
server.listen(9000);
