
var activiti = require('./lib/activiti');

var opts = {
    host: '10.2.122.16', 
    port: 8082
    
};
var client = new activiti(opts);

// client.startProcessByKey('create_new_portal_user')
//     .then(function(result){
//         console.log(JSON.stringify(result));
//     })
//     .fail(console.log)
//     .done();

// client.runtimeTasks('5018')
//     .then(function(result){
//         console.log(JSON.stringify(result));
//     })
//     .fail(console.log)
//     .done();

// client.completeTask('5030', {mobile: '18680560728', user: 'jack'})
//     .then(function(result){
//         console.log(JSON.stringify(result));
//     })
//     .fail(console.log)
//     .done();


// client.getHistoricProcessInstance('5018')
//     .then(function(result){
//         console.log(JSON.stringify(result));
//     })
//     .fail(console.log)
//     .done();

// client.isProcessCompleted('5018')
//     .then(function(result){
//         console.log(JSON.stringify(result));
//     })
//     .fail(console.log)
//     .done();

    
client.getRuntimeTask('5095')
    .then(function(result){
        console.log(JSON.stringify(result));
    })
    .fail(console.log)
    .done();