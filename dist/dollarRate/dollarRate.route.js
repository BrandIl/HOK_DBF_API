'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _dollarRate = require('./dollarRate.service');

var _dollarRate2 = _interopRequireDefault(_dollarRate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reportRouter = (0, _express.Router)();

reportRouter.route('/').get(function (req, res, next) {
    var date = req.query.date;

    new _dollarRate2.default().getDollarRate(date).then(function (dollarRate) {
        res.send({ dollarRate: dollarRate });
    });
});

exports.default = reportRouter;