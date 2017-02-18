var rp = require('request-promise');

module.exports = function (app) {

    return function (config) {
        if (config) {
            var headers = config.headers || null;
            var prefix = config.prefix || '';
        }

        return {
            get: function (uri, callback) {
                uri = prefix + uri;
                rp({uri: uri, headers: headers})
                    .then(function (data) {
                        callback(null, JSON.parse(data));
                    })
                    .catch(function (err) {
                        callback(err, null);
                    });
            },
            post: function (uri, data, callback) {
                uri = prefix + uri;
                var options = {
                    method: 'POST',
                    headers: headers,
                    uri: uri,
                    body: data
                };
                rp(options)
                    .then(function (body) {
                        callback(null, JSON.parse(body));
                    })
                    .catch(function (err) {
                        callback(err, null);
                    });
            }
        };
    };
};
