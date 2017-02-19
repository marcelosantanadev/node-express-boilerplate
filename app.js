let express = require('express')
    , path = require('path')
    , load = require('express-load')
    , cors = require('cors')
    , logger = require('morgan')
    , config = require('./config/config')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , Cache = require('node-cache')
    , helmet = require('helmet')
    , favicon = require('serve-favicon')
    , shortid = require('shortid');

module.exports = function () {
    let app = express();

    let cache = new Cache({stdTTL: 180, checkperiod: 185});
    cache.set('auth', {token: shortid.generate()}, 10000);
    cache.on('expired', function (k, v) {
        cache.set('auth', {token: shortid.generate()}, 10000);
    });
    app.set('cache', cache);

    let port = config.port || process.env.PORT || 80;
    app.set('port', port);

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
        app.use(function (req, res, next) {
            if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
                res.redirect('https://' + req.get('Host') + req.url);
            }
            else
                next();
        })
    }

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(cors({credentials: true}));
    app.use(favicon(__dirname + '/public/img/logo.png'));


    load('utils', {verbose: true})
        .then('controllers')
        .then('routes')
        .into(app, function (err, res) {
            if (err) throw err.name;
        });

    if (process.env.NODE_ENV === 'development') {
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'localhost, lince.automobi.com.br, www.lince.automobi.com.br');
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Client-Type");

            next();
        });
    }

    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    return app;
};