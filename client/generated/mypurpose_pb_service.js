// package: my_purpose
// file: mypurpose.proto

var mypurpose_pb = require("./mypurpose_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var MyPurpose = (function () {
  function MyPurpose() {}
  MyPurpose.serviceName = "my_purpose.MyPurpose";
  return MyPurpose;
}());

MyPurpose.IndexPurposes = {
  methodName: "IndexPurposes",
  service: MyPurpose,
  requestStream: false,
  responseStream: true,
  requestType: mypurpose_pb.PurposeRequest,
  responseType: mypurpose_pb.PurposeResponse
};

MyPurpose.ShowPurpose = {
  methodName: "ShowPurpose",
  service: MyPurpose,
  requestStream: false,
  responseStream: false,
  requestType: mypurpose_pb.PurposeRequest,
  responseType: mypurpose_pb.PurposeResponse
};

MyPurpose.CreatePurpose = {
  methodName: "CreatePurpose",
  service: MyPurpose,
  requestStream: false,
  responseStream: false,
  requestType: mypurpose_pb.PurposeRequest,
  responseType: mypurpose_pb.PurposeResponse
};

MyPurpose.EditPurpose = {
  methodName: "EditPurpose",
  service: MyPurpose,
  requestStream: false,
  responseStream: false,
  requestType: mypurpose_pb.PurposeRequest,
  responseType: mypurpose_pb.PurposeResponse
};

MyPurpose.DeletePurpose = {
  methodName: "DeletePurpose",
  service: MyPurpose,
  requestStream: false,
  responseStream: false,
  requestType: mypurpose_pb.PurposeRequest,
  responseType: mypurpose_pb.PurposeResponse
};

MyPurpose.IndexActions = {
  methodName: "IndexActions",
  service: MyPurpose,
  requestStream: false,
  responseStream: true,
  requestType: mypurpose_pb.ActionRequest,
  responseType: mypurpose_pb.ActionResponse
};

MyPurpose.EditAction = {
  methodName: "EditAction",
  service: MyPurpose,
  requestStream: false,
  responseStream: false,
  requestType: mypurpose_pb.ActionRequest,
  responseType: mypurpose_pb.ActionResponse
};

MyPurpose.CreateAction = {
  methodName: "CreateAction",
  service: MyPurpose,
  requestStream: false,
  responseStream: false,
  requestType: mypurpose_pb.ActionRequest,
  responseType: mypurpose_pb.ActionResponse
};

MyPurpose.DeleteAction = {
  methodName: "DeleteAction",
  service: MyPurpose,
  requestStream: false,
  responseStream: false,
  requestType: mypurpose_pb.ActionRequest,
  responseType: mypurpose_pb.ActionResponse
};

MyPurpose.IndexCalendars = {
  methodName: "IndexCalendars",
  service: MyPurpose,
  requestStream: false,
  responseStream: true,
  requestType: mypurpose_pb.CalendarRequest,
  responseType: mypurpose_pb.CalendarResponse
};

exports.MyPurpose = MyPurpose;

function MyPurposeClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MyPurposeClient.prototype.indexPurposes = function indexPurposes(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(MyPurpose.IndexPurposes, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

MyPurposeClient.prototype.showPurpose = function showPurpose(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MyPurpose.ShowPurpose, {
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

MyPurposeClient.prototype.createPurpose = function createPurpose(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MyPurpose.CreatePurpose, {
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

MyPurposeClient.prototype.editPurpose = function editPurpose(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MyPurpose.EditPurpose, {
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

MyPurposeClient.prototype.deletePurpose = function deletePurpose(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MyPurpose.DeletePurpose, {
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

MyPurposeClient.prototype.indexActions = function indexActions(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(MyPurpose.IndexActions, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

MyPurposeClient.prototype.editAction = function editAction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MyPurpose.EditAction, {
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

MyPurposeClient.prototype.createAction = function createAction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MyPurpose.CreateAction, {
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

MyPurposeClient.prototype.deleteAction = function deleteAction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MyPurpose.DeleteAction, {
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

MyPurposeClient.prototype.indexCalendars = function indexCalendars(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(MyPurpose.IndexCalendars, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.MyPurposeClient = MyPurposeClient;

