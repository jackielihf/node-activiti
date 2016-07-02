

var request = require('request');
var Q = require('q');

// http client
var rest = function(){
    this.timeout = 10000;  //10 seconds
};

var doRequest = function(opts){
    var deferred = Q.defer();
    request(opts, function(err, resp, body){
        console.log(err, body);
        if(err){
            return deferred.reject(err);
        }
        var result = {};    
        try{
            result.statusCode = resp.statusCode;
            if(body){
                result.data = JSON.parse(body);        
            }
            deferred.resolve(result);    
        }catch(e){
            deferred.reject('parse json err:' + e);
        }        
    });
    return deferred.promise;  
};

rest.prototype.error = function(err){
    var deferred = Q.defer();
    deferred.reject(err);
    return deferred.promise;
};

rest.prototype.get = function(url, option){
    option = option || {};
    var opts = {};
    opts.method = "GET";
    opts.url = url;
    opts.timeout = this.timeout;
    if(option.headers){
        opts.headers = option.headers;
    }
    //request
    return doRequest(opts);
};

rest.prototype.post = function(url, option){
    option = option || {};
    var opts = {};
    opts.method = "POST";
    opts.url = url;
    opts.timeout = this.timeout;
    //body
    var body = '';
    if(option.body){
        body = JSON.stringify(option.body);
    }
    opts.body = body;
    //headers
    opts.headers = option.headers || {};
    opts.headers['Content-Length'] = Buffer.byteLength(body, 'utf8');
    opts.headers['Content-Type'] = 'application/json';
    //request
    return doRequest(opts);
};

rest.prototype.put = function(url, option){
    option = option || {};
    var opts = {};
    opts.method = "PUT";
    opts.url = url;
    opts.timeout = this.timeout;
    //body
    var body = '';
    if(option.body){
        body = JSON.stringify(option.body);
    }
    opts.body = body;
    //headers
    opts.headers = option.headers || {};
    opts.headers['Content-Length'] = Buffer.byteLength(body, 'utf8');
    opts.headers['Content-Type'] = 'application/json';
    //request
    return doRequest(opts);
};


rest.prototype.postForm = function(url, option){
    option = option || {};
    var opts = {};
    opts.method = "POST";
    opts.url = url;
    opts.timeout = this.timeout;
    //body
    opts.form = option.body || '';
    //headers
    opts.headers = option.headers || {};
    opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    //request
    return doRequest(opts);
};


module.exports = new rest();







