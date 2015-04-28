var http = require('http');
var medals = require('./medals');


var csCallback = function (request,response){
response.writeHead(200);
var serverOutput = medals.init(response);

response.end(medals.init(response));

};

var server = http.createServer(csCallback);

server.listen(8080,'localhost');