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
    "LAKNUM": "key",
    "LAKFAMELLY": "lastName",
    "LAKNAME": "firstName",
    "LAKCITY": "city",
    "LAKSTREET": "street",
    "LAKZIP": "zip",
    "LAKPHONE1": "phone",
    "LAKPHONE2": "anotherPhone"
};

var handleGetCustomers = function handleGetCustomers(records) {
    return records.map(function (program) {
        program.name = program.name && program['name'].split('').reverse().join('');
        program.lastName = program.lastName && program['lastName'].split('').reverse().join('');
        program.firstName = program.firstName && program['firstName'].split('').reverse().join('');
        program.city = program.city && program['city'].split('').reverse().join('');
        program.street = program.street && program['street'].split('').reverse().join('');
        return program;
    });
};

var CustomerReader = function () {
    function CustomerReader(organizationKey) {
        _classCallCheck(this, CustomerReader);

        var dataPath = process.env.DBPATH;

        this.path = dataPath + "\\" + organizationKey + "\\LAKOHOT.DBF";
    }

    _createClass(CustomerReader, [{
        key: "getCustomers",
        value: function getCustomers() {
            return _dbfReader2.default.read(this.path, dbfMapping).then(function (data) {
                return handleGetCustomers(data.records);
            });
        }
    }]);

    return CustomerReader;
}();

exports.default = CustomerReader;