'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _collection = require('./collection.service');

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reportRouter = (0, _express.Router)();

reportRouter.route('/:organizationKey/collection').get(function (req, res, next) {
    var organizationKey = req.params.organizationKey;
    var date = req.query.date;

    var collectionService = new _collection2.default(organizationKey);
    if (date) {
        collectionService.getCollectionsByDate(date).then(function (data) {
            res.send(data);
        });
    } else {
        collectionService.getCollections().then(function (data) {
            res.send(data);
        });
    }
});

exports.default = reportRouter;