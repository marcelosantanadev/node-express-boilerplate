'use strict';

var _ = require('lodash');

exports.code500 = function(res, err) {
  console.log('err', err);
  var msg = (_.isObject(err)) ? err.name : "Internal server error";
  return res.status(500).json({'message': msg});
};

exports.code400 = function(res, msg) {
  msg = msg || "Bad Request";
  return res.status(400).json({'message': msg});
};

exports.code401 = function(res, msg) {
  msg = msg || "Unauthorized";
  return res.status(401).json({'message': msg});
};

exports.code403 = function(res, msg) {
  msg = msg || "Forbidden";
  return res.status(403).json({'message': msg});
};


exports.code404 = function(res, msg) {
  msg = msg || "Not found";
  return res.status(404).json({'message': msg});
};

exports.code409 = function(res, msg) {
  msg = msg || "Conflict";
  return res.status(409).json({'message': msg});
};

exports.code415 = function(res, msg) {
  msg = msg || "Unsupported Media Type";
  return res.status(415).json({'message': msg});
};
