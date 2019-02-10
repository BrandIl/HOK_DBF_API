'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _program = require('./program.service');

var _program2 = _interopRequireDefault(_program);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reportRouter = (0, _express.Router)();

reportRouter.route('/:organizationKey/program').get(function (req, res, next) {
    var organizationKey = req.params.organizationKey;


    new _program2.default(organizationKey).getPrograms().then(function (data) {
        res.send(data);
    });
});

exports.default = reportRouter;