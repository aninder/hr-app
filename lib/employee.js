var employeeDb = require('../database/employees');
exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

Array.prototype.find = function(callback){
    var vv=null;
    try{
        this.forEach(function(obj){
            if (callback(obj)) {
                vv=obj;
                throw new Error('found match'+obj);
            }
        });
    }catch(e){
        console.log('--->'+e.message);
        }
    return vv;
};

function getEmployees (callback) {
    if (employeeDb) {
        callback(null, employeeDb);
    } else {
        callback("employeedb not loaded");
    }
}

function getEmployee (employeeId, callback) {
    getEmployees(function (error, data) {
        if (error) {
            return callback(error);
        }
        var result = data.find(function(item) {
            return item.id === employeeId;
        });
        if(result) {
           return callback(null, result);
        }
        return callback("employee not found...!!");
    });
}
