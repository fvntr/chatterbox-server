var utils = require('./utils');
var objectId = 1;
var messages = [
  {
    text:'goodbye world',
    username: 'imgonnadoit',
    objectId: objectId
  }
];

var actions = {
  'GET': function(request, response){
    utils.sendResponse(response, {results: messages});
  },

  'POST': function(request, response){
    utils.collectData(request, function(message){
      message.objectId = ++objectId;
      messages.push(message);
      sendResponse(response, {objectId: objectId});
    });
  },

  OPTIONS: function(request, response){
    utils.sendResponse(response);
  }
};

module.exports = function(request, response) {
  var statusCode = 200;
  var action = actions[request.method];
  if(action){
    action(request, response);
  } else {
    utils.sendResponse(response, 'Not Found, 404');
  }
};


