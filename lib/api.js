
var rest = require('./rest');

var api = function(options){
    this.paths = {
        getProcessDefinitions: '/api/repository/process-definitions',
        getProcessDefinitionById: '/api/repository/process-definitions/{id}',
        getProcessDefinitionByKey: '/api/repository/process-definitions?key={key}',
        createProcessInstance: '/api/runtime/process-instances',
        getProcessInstance: '/api/runtime/process-instances/{id}',
        getProcessInstanceByBusinessKey: '/api/runtime/process-instances?businessKey={key}',
        getHistoricProcessInstance: '/api/history/historic-process-instances/{id}',
        getRuntimeTaskByProcess: '/api/runtime/tasks?processInstanceId={id}',
        finishRuntimeTask: '/api/runtime/tasks/{id}',
        getRuntimeTaskById: '/api/runtime/tasks/{id}'
        
    };
    this.options = options || {};
    this.uri = options.uri;
    if(!this.uri){
        throw new Error('invalid uri');
    }
    this.auth = options.auth;
};

api.prototype.getUrl = function(path){
    return this.uri + path;
};

api.prototype.getProcessDefinitions = function(paging){
    paging = paging || {sort:null, order: asc, start: 0 , size: 10};
    var url = this.getUrl(this.paths.getProcessDefinitions);
    return rest.get(url, {auth: this.auth});
};

api.prototype.getProcessDefinitionById = function(id){
    if(!id){
        return rest.error('invalid id');
    }
    var url = this.getUrl(this.paths.getProcessDefinitionById.replace('{id}', id));
    return rest.get(url, {auth: this.auth});
};

api.prototype.getProcessDefinitionByKey = function(key){
    if(!key){
        return rest.error('invalid key');
    }
    var url = this.getUrl(this.paths.getProcessDefinitionByKey.replace('{key}', key));
    return rest.get(url, {auth: this.auth});
};

api.prototype.createProcessInstance = function(params){
    params = params || {};
    if((!params.processDefinitionId && !params.processDefinitionKey) || !params.businessKey){
        return rest.error('invalid params');
    }
    var options = {
        body: params,
        auth: this.auth
    };
    var url = this.getUrl(this.paths.createProcessInstance);
    return rest.post(url, options);
};

api.prototype.getProcessInstance = function(id){
    if(!id){
        return rest.error('invalid id');
    }
    var url = this.getUrl(this.paths.getProcessInstance.replace('{id}', id));
    return rest.get(url, {auth: this.auth});

};

api.prototype.getProcessInstanceByBusinessKey = function(key){
    if(!key){
        return rest.error('invalid key');
    }
    var url = this.getUrl(this.paths.getProcessInstanceByBusinessKey.replace('{key}', key));
    return rest.get(url, {auth: this.auth});

};


api.prototype.getHistoricProcessInstance = function(id){
    if(!id){
        return rest.error('invalid id');
    }
    var url = this.getUrl(this.paths.getHistoricProcessInstance.replace('{id}', id));
    return rest.get(url, {auth: this.auth});

};

api.prototype.getRuntimeTaskByProcess = function(id){
    if(!id){
        return rest.error('invalid id');
    }
    var url = this.getUrl(this.paths.getRuntimeTaskByProcess.replace('{id}', id));
    return rest.get(url, {auth: this.auth});
};

api.prototype.finishRuntimeTask = function(id, params){
    if(!id){
        return rest.error('invalid id');
    }
    params = params || {};
    if(!params.action){
        return rest.error('invalid params');
    }
    var options = {
        body: params,
        auth: this.auth
    };
    var url = this.getUrl(this.paths.finishRuntimeTask.replace('{id}', id));
    return rest.post(url, options);
};

api.prototype.getRuntimeTaskById = function(id){
    if(!id){
        return rest.error('invalid id');
    }
    var url = this.getUrl(this.paths.getRuntimeTaskById.replace('{id}', id));
    return rest.get(url, {auth: this.auth});
};


// test
// var options = {uri: 'http://10.2.122.16:8082', auth: {user: 'jack', pass: '111'}};
// var client = new api(options);


// client.createProcessInstance({processDefinitionKey: 'create_new_portal_user', businessKey: '123456'})
//     .then(function(result){
//         console.log(JSON.stringify(result));
//     })
//     .fail(console.log)
//     .done();


// client.getHistoricProcessInstance('5001')
//     .then(function(result){
//         console.log(JSON.stringify(result));
//     })
//     .fail(console.log)
//     .done();

// client.getRuntimeTaskByProcess('5001')
//     .then(function(result){
//         console.log(JSON.stringify(result));
//     })
//     .fail(console.log)
//     .done();


// client.finishRuntimeTask('5011', {action: 'complete'})
//     .then(function(result){
//         console.log(JSON.stringify(result));
//     })
//     .fail(console.log)
//     .done();


module.exports = api;





