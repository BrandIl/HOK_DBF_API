'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _organization = require('./organization/organization.route');

var _organization2 = _interopRequireDefault(_organization);

var _program = require('./programs/program.route');

var _program2 = _interopRequireDefault(_program);

var _collection = require('./collections/collection.route');

var _collection2 = _interopRequireDefault(_collection);

var _dollarRate = require('./dollarRate/dollarRate.route');

var _dollarRate2 = _interopRequireDefault(_dollarRate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();
var port = process.env.NODE_ENV || 3002;

// app configurations
app.set('port', port);

app.use('/organization', _organization2.default);
app.use('/organization', _program2.default);
app.use('/organization', _collection2.default);
app.use('/dollarRate', _dollarRate2.default);

app.get('/', function (req, res, next) {
    res.json({
        status: 'success',
        data: req.body
    });
});

// establish http server connection
app.listen(3002, function () {
    console.log('App running on port ' + port);
});