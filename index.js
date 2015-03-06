var http = require('http');
var employeeService = require('./lib/employee');
var responseGenerator = require('./lib/responseGenerator');
var host='127.0.0.1';
var port=9000;

server = http.createServer(function (request, response) {
    console.log(request.method + ' ' + request.url);
    if (request.method !== 'GET') {
        return responseGenerator.send501(request.method + ' not implemented by this ➥server.', response);
    }
    //all employees
    if (/^\/emp$/i.exec(request.url)) {
        employeeService.getEmployees(function(error,employees){
            if(error){
                return responseGenerator.send404(error, response);
            }
                return responseGenerator.sendJson(employees, response);
        });
    } else if (match = /^\/emp\/(\d+)$/i.exec(request.url)) {
        //some employeeService with id
        employeeService.getEmployee(match[1],function(error,employee) {
            if(error) {
                return responseGenerator.send404(error, response);
            }
            return responseGenerator.sendJson(employee, response);
        });
    } else {
        responseGenerator.staticFile('/public')(request.url, response);
    }
});

server.on('listening', function(){
    console.log('server listening on '+host+' and port '+port);
});
server.listen(port, host);