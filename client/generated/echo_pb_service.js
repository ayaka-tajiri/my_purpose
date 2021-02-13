// package: api
// file: echo.proto

var echo_pb = require("./echo_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Echo = (function () {
  function Echo() {}
  Echo.serviceName = "api.Echo";
  return Echo;
}());

Echo.Echo = {
  methodName: "Echo",
  service: Echo,
  requestStream: false,
  responseStream: false,
  requestType: echo_pb.EchoRequest,
  responseType: echo_pb.EchoResponse
};

exports.Echo = Echo;

function EchoClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EchoClient.prototype.echo = function echo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Echo.Echo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.EchoClient = EchoClient;

