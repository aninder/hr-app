var fs = require('fs');

exports.send404 = function (response) {
    console.error("Resource not found");
    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    response.end('Not Found');
};
exports.sendJson = function (data, response) {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(data));
};
exports.send501 = function (data, response) {
    console.error(data.red);
    response.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    response.end(data);
};
exports.send500 = function (data, response) {
    console.error(data.red);
    response.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    response.end(data);
};
exports.staticFile = function (staticPath) {
    return function(fpath, response) {
        if (fpath === '/favicon.ico')
            return response.end();
        var readStream;
        // Fix so routes to /home and /home.html both work.
        fpath = fpath.replace(/^(\/\w+)(.html)?$/i,'$1.html');
        fpath = '.' + staticPath + fpath;
        fs.stat(fpath, function (error, stats) {
            if (error || stats.isDirectory()) {
                return exports.send404(response);
            }
            readStream = fs.createReadStream(fpath);
            return readStream.pipe(response);
        }); }
};