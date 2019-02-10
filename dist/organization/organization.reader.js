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
    "COMPANY": "key",
    "COMPANYHEB": "name",
    "CODNOSE": "code",
    "ADRRES": "address",
    "YOMGVIA": 'collectionDate',
    "EMAIL": 'email'
};

var handleGetOrganizations = function handleGetOrganizations(records) {
    return records.map(function (company) {
        company.name = company.name && company['name'].split('').reverse().join('').replace(/([^a-z0-9א-ת ]+)/gi, '-');
        company.address = company.address && company['address'].split('').reverse().join('');
        company.isActive = company.collectionDate !== '88';
        return company;
    }).filter(function (org) {
        return org.isActive;
    });
};

var OrganizationReader = function () {
    function OrganizationReader() {
        _classCallCheck(this, OrganizationReader);

        var dataPath = process.env.DBPATH;


        this.path = dataPath + "\\CONFIG.DBF";
    }

    _createClass(OrganizationReader, [{
        key: "getOrganizations",
        value: function getOrganizations() {
            return _dbfReader2.default.read(this.path, dbfMapping).then(function (data) {
                return handleGetOrganizations(data.records);
            });
        }
    }, {
        key: "getOrganization",
        value: function getOrganization(key) {

            return this.getOrganizations().then(function (organizations) {

                return organizations.find(function (organization) {
                    return organization.key == key;
                });
            });
        }
    }]);

    return OrganizationReader;
}();

exports.default = OrganizationReader;