'use strict';

var _ = require('lodash');

// ====================
// config NODE_ENV ====
// ====================
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
    console.log('NODE_ENV ', process.env.NODE_ENV);
}

module.exports = _.extend(
    require('./env/all'),
    require('./env/' + process.env.NODE_ENV) || {}
);
