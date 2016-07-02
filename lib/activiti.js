
var Q = require('q');
var uuid = require('uuid');
var api = require('./api');

var activiti = function(options){
    options = options || {};
    this.host = options.host;
    this.port = options.port;
    this.username = options.username || '';
    this.password = options.password || '';

    if(!this.host || !this.port){
        throw Error('invalid host or port');
    }

    var opts = {
        uri: 'http://' + this.host + ':' + this.port
    };
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

activiti.prototype.startProcess = function(id){
    var deferred = Q.defer();
    if(!id){
        deferred.reject('invalid process definition id');
    }
    var params = {
        processDefinitionId: id,
        businessKey: uuid.v4()
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

activiti.prototype.startProcessByKey = function(key){
    var deferred = Q.defer();
    if(!key){
        deferred.reject('invalid process definition key');
    }
    var params = {
        processDefinitionKey: key,
        businessKey: uuid.v4()
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

activiti.prototype.completeTask = function(id){
    var deferred = Q.defer();
    if(!id){
        deferred.reject('invalid task id');
    }

    client.finishRuntimeTask(id, {action: 'complete'})
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


module.exports = activiti;




