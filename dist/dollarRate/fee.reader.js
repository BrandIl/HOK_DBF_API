'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbfReader = require('../common/dbfReader');

var _dbfReader2 = _interopRequireDefault(_dbfReader);

var _dateFormat = require('dateFormat');

var _dateFormat2 = _interopRequireDefault(_dateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dbfMapping = {
    "DATEGVI": "date",
    "MOSADNAME": "organizationName",
    "CODNOSE": "organizationCode",
    "SCUMGVI": "sum",
    "CAMUTGVI": "amount",
    "SCUMNEW": "SCUMNEW",
    "CAMUTNEW": "CAMUTNEW",
    "AMLGVI": "AMLGVI",
    "AMLNEW": "AMLNEW",
    "DOLAR": "dollarRate"
};

var handleGetFees = function handleGetFees(records) {
    return records.map(function (fee) {
        return Object.assign({}, fee, { organizationName: fee.organizationName && fee['organizationName'].split('').reverse().join('') });
    });
};

var FeeReader = function () {
    function FeeReader() {
        _classCallCheck(this, FeeReader);

        var dataPath = process.env.DBPATH;

        this.path = dataPath + '\\AMLOT.DBF';
    }

    _createClass(FeeReader, [{
        key: 'getFees',
        value: function getFees(date) {
            return _dbfReader2.default.read(this.path, dbfMapping).then(function (data) {
                return handleGetFees(data.records);
            }).then(function (fees) {
                return fees.filter(function (fee) {
                    return (0, _dateFormat2.default)(fee.date, 'dd/mm/yyyy') === (0, _dateFormat2.default)(new Date(date), 'dd/mm/yyyy');
                });
            });
        }
    }, {
        key: 'getCompanyFee',
        value: function getCompanyFee(organizationCode, date) {
            return this.getFees(date).then(function (fees) {
                return fees.find(function (fee) {
                    return fee.organizationCode == organizationCode;
                });
            });
        }
    }]);

    return FeeReader;
}();

exports.default = FeeReader;