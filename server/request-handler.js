var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  'Content-Type' : "application/json"
};

var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));  
};

// This collects the data
var collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(JSON.parse(data));
  });
};

var messages = [
  {
    text:'goodbye world',
    username: 'imgonnadoit'
  }
];
module.exports = function(request, response) {
  var statusCode = 200;

  if(request.method === "GET"){
    sendResponse(response, {results: messages});
  } else if (request.method === "POST"){
    collectData(request, function(message){
      message.objectId = ++objectId;
      messages.push(message);
      sendResponse(response, {objectId: 1});
    });
  } else if (request.method === "OPTIONS"){
    sendResponse(response);
  }
};


