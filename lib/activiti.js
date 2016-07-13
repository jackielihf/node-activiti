
var Q = require('q');
var uuid = require('uuid');
var api = require('./api');

var activiti = function(options){
    options = options || {};
    this.host = options.host;
    this.port = options.port;
    this.username = options.username;
    this.password = options.password;

    if(!this.host || !this.port){
        throw Error('invalid host or port');
    }
    var opts = {
        uri: 'http://' + this.host + ':' + this.port,
    };
    //authorization basic
    if(this.username){
        opts.auth = {
            user: this.username,
            pass: this.password
        };
    }
    this.client = new api(opts);

};

//expose activiti api
activiti.api = api;

var wrapMsg = function(prefix, obj){
    var msg = prefix || '';
    obj = obj || {};
    if(typeof obj === 'string'){
        msg = msg + obj;
    }else{
        msg = msg + JSON.stringify(obj);
    }
    return msg;
};

var objectToArray = function(obj){
    obj = obj || {};
    var result = [];
    if(typeof obj !== 'object'){
        return result;
    }
    for(var key in obj){
        var item = {
            name: key,
            value: obj[key]
        };
        result.push(item);
    }
    return result;
}

activiti.prototype.startProcess = function(id, options){
    options = options || {};
    var deferred = Q.defer();
    if(!id){
        deferred.reject('invalid process definition id');
    }
    var params = {
        processDefinitionId: id,
        businessKey: options.businessKey || uuid.v4()
    };
    this.client.createProcessInstance(params)
        .then(function(result){
            if(result != null && result.statusCode <= 201){
                deferred.resolve(result.data);
            }else{
                deferred.reject(wrapMsg('start process failed: ', result));
            }
        })
        .fail(function(err){
            deferred.reject(wrapMsg('start process failed: ', err));
        })
        .done();
    
    return deferred.promise;
};

activiti.prototype.startProcessByKey = function(key, options){
    options = options || {};
    var deferred = Q.defer();
    if(!key){
        deferred.reject('invalid process definition key');
    }
    var params = {
        processDefinitionKey: key,
        businessKey: options.businessKey || uuid.v4()
    };
    this.client.createProcessInstance(params)
        .then(function(result){
            if(result != null && result.statusCode <= 201){
                deferred.resolve(result.data);
            }else{
                deferred.reject(wrapMsg('startProcessByKey failed: ', result));
            }
        })
        .fail(function(err){
            deferred.reject(wrapMsg('startProcessByKey failed: ', err));
        })
        .done();
    
    return deferred.promise;
};

activiti.prototype.getProcessInstance = function(id){
    var deferred = Q.defer();
    if(!id){
        deferred.reject('invalid process instance id');
    }
    
    this.client.getProcessInstance(id)
        .then(function(result){
            if(result != null && result.statusCode <= 201){
                deferred.resolve(result.data);
            }else{
                deferred.reject(wrapMsg('getProcessInstance failed: ', result));
            }
        })
        .fail(function(err){
            deferred.reject(wrapMsg('getProcessInstance failed: ', err));
        })
        .done();
    return deferred.promise;
};

activiti.prototype.getHistoricProcessInstance = function(id){
    var deferred = Q.defer();
    if(!id){
        deferred.reject('invalid process instance id');
    }
    
    this.client.getHistoricProcessInstance(id)
        .then(function(result){
            if(result != null && result.statusCode <= 201){
                deferred.resolve(result.data);
            }else{
                deferred.reject(wrapMsg('getHistoricProcessInstance failed: ', result));
            }
        })
        .fail(function(err){
            deferred.reject(wrapMsg('getHistoricProcessInstance failed: ', err));
        })
        .done();
    return deferred.promise;
};

activiti.prototype.isProcessCompleted = function(id){
    var deferred = Q.defer();
    if(!id){
        deferred.reject('invalid process instance id');
    }
    this.client.getHistoricProcessInstance(id)
        .then(function(result){
            if(result != null && result.statusCode <= 201 && result.data != null){
                deferred.resolve((result.data.endTime !== null));
            }else{
                deferred.reject(wrapMsg('isProcessCompleted failed: ', result));
            }
        })
        .fail(function(err){
            deferred.reject(wrapMsg('isProcessCompleted failed: ', err));
        })
        .done();
    return deferred.promise;
};



activiti.prototype.runtimeTasks = function(id){
    var deferred = Q.defer();
    if(!id){
        deferred.reject('invalid process instance id');
    }

    this.client.getRuntimeTaskByProcess(id)
        .then(function(result){
            if(result != null && result.statusCode <= 201){
                deferred.resolve(result.data);
            }else{
                deferred.reject(wrapMsg('get runtimeTasks failed: ', result));
            }
        })
        .fail(function(err){
            deferred.reject(wrapMsg('get runtimeTasks failed: ', err));
        })
        .done();
    return deferred.promise;
};

activiti.prototype.completeTask = function(id, opts){
    var deferred = Q.defer();
    if(!id){
        deferred.reject('invalid task id');
    }
    var params = {
        action: 'complete',
        variables: objectToArray(opts)
    };
    this.client.finishRuntimeTask(id, params)
        .then(function(result){
            if(result != null && result.statusCode <= 201){
                deferred.resolve(true);
            }else{
                deferred.reject(wrapMsg('complete runtimeTasks failed: ', result));
            }
        })
        .fail(function(err){
            deferred.reject(wrapMsg('complete runtimeTasks failed: ', err));
        })
        .done();

    return deferred.promise;
};

activiti.prototype.getRuntimeTask = function(id){
    var deferred = Q.defer();
    if(!id){
        deferred.reject('invalid task id');
    }

    this.client.getRuntimeTaskById(id)
        .then(function(result){
            if(result != null && result.statusCode <= 201){
                deferred.resolve(result.data);
            }else{
                deferred.reject(wrapMsg('get runtimeTask failed: ', result));
            }
        })
        .fail(function(err){
            deferred.reject(wrapMsg('get runtimeTask failed: ', err));
        })
        .done();
    return deferred.promise;

};



module.exports = activiti;




