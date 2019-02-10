'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _organization = require('./organization.service');

var _organization2 = _interopRequireDefault(_organization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reportRouter = (0, _express.Router)();

reportRouter.route('/').get(function (req, res, next) {
    new _organization2.default().getOrganizations().then(function (data) {
        res.send(data);
    });
});

reportRouter.route('/:organizationKey').get(function (req, res, next) {
    var organizationKey = req.params.organizationKey;


    new _organization2.default().getOrganization(organizationKey).then(function (data) {
        res.send(data);
    });
});

reportRouter.route('/:organizationKey/project').get(function (req, res, next) {
    var organizationKey = req.params.organizationKey;


    new _organization2.default().getProjects(organizationKey).then(function (data) {
        res.send(data);
    });
});

exports.default = reportRouter;