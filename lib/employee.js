var employeeDb = require('../database/employees');
exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

Array.prototype.find = function(func){
    vv=null;
    try{
        this.forEach(function(obj){
            if (func(obj)) {
                vv=obj;
                throw new Error();
            }
        });
    }catch(e){
        }
    return vv;
    };

function getEmployees (func) {
    if (employeeDb) {
        func(null, employeeDb);
    } else {
        func("employeedb not loaded");
    }
}

function getEmployee (employeeId, func) {
    getEmployees(function (error, data) {
        if (error) {
            return func(error);
        }
        var result = data.find(function(item) {
            return item.id === employeeId;
        });
        if(result) {
           return func(null, result);
        }
        return func("employee not found...!!");
    });
}
