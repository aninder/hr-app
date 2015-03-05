var http = require('http');
var emp = require('./lib/employee');
var host='127.0.0.1';
var port=9000;

server = http.createServer(function (request, response) {
    console.log(request.method + ' ' + request.url);
    if (request.method !== 'GET') {
        response.writeHead(501, {
            'Content-Type': 'text/plain'
        });
        return response.end(request.method + ' not implemented by this ➥server.');
    }
    //all employees
    if (/^\/emp$/i.exec(request.url)) {
        emp.getEmployees(function(error,employees){
            if(error){
                response.writeHead(502);
                return response.end(error);
            } else {
            response.writeHead(200);
            employees.forEach(function(employee){
                response.write(employee.id+' '+employee.name+' '+employee.address+'\n');
            })}
        });
        return response.end();
    } else
    //some emp with id
    var match;
    if (match = /^\/emp\/(\d+)$/i.exec(request.url)) {
        emp.getEmployee(match[1],function(error,employee) {
            if(error) {
                response.writeHead(200);
                return response.end(error);
            }
            response.writeHead(200);
            response.write(employee.id+' '+employee.name+' '+employee.address);
            return response.end('some emp');
        });
    }
        response.writeHead(200);
        return response.end('wtf ??');
});

server.on('listening', function(){
    console.log('server listening on '+host+' and port '+port);
});
server.listen(port, host);