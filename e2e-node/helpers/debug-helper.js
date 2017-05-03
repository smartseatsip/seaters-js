var util = require('util');
var core = require('core-js/library');

function curlifyRequest(request) {
  var headers = request.popsicleRequest.rawHeaders.map(h => h[0] + ': ' + h[1]);
  var data = '';
  if (request.popsicleRequest.body) {
    headers = headers + ' -H "Content-Type: application/json"';
    data = '-d \'' + JSON.stringify(request.popsicleRequest.body) + '\'';
  }
  return util.format('curl -v -X %s "%s" %s %s',
    request.requestDefinition.method,
    request.endpoint.absoluteEndpoint,
    headers,
    data
  );
}

function logRequest(abstractEndpoint, serializer) {
  client.api.requestsSubject.subscribe((request) => {
    if (request.endpoint.abstractEndpoint === abstractEndpoint) {
      console.log((serializer || curlifyRequest)(request));
    }
  });
}

module.exports = {
  logRequest: logRequest
};
