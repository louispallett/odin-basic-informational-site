const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    let filePath;
    
    // If the requested URL doesn't have an extension, add ".html"
    if (!path.extname(req.url)) {
        filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url + ".html");
    } else {
        filePath = path.join(__dirname, "public", req.url);
    }

    let extName = path.extname(filePath);
    let contentType = "text/html";
    switch (extName) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code == "ENOENT") {
                fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end(content, "utf8");
                });
            } else {
                res.writeHead(500);
                res.end("Server Error: " + err.code);
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content);
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server running on port " + PORT));