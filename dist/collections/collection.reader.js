"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbfReader = require("../common/dbfReader");

var _dbfReader2 = _interopRequireDefault(_dbfReader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dbfMapping = {
    "SHEKEL": "sum",
    "PAYDATE": "date",
    "PAYNUM": "programKey",
    "PAYKIND": "type"
};

var handleGetPrograms = function handleGetPrograms(records) {
    return records.map(function (program) {
        return program;
    });
};

var CollectionReader = function () {
    function CollectionReader(organizationKey, date) {
        _classCallCheck(this, CollectionReader);

        var dataPath = process.env.DBPATH;

        this.path = dataPath + "\\" + organizationKey + "\\GVIA.DBF";
    }

    _createClass(CollectionReader, [{
        key: "getCollections",
        value: function getCollections() {
            return _dbfReader2.default.read(this.path, dbfMapping).then(function (data) {
                return handleGetPrograms(data.records);
            });
        }
    }]);

    return CollectionReader;
}();

exports.default = CollectionReader;