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
    "PAYNUM": "key",
    "LAKNUM": "customerKey",
    "PAYHESH": "bankAccount",
    "DATEJOIN": "joinDate",
    "DATEOPEN": "openDate",
    "DATECLOSE": "closeDate",
    "PAYSHEKEL": "sumShekel",
    "PAYDOLAR": "sumDollar",
    "PAYDESTENY": "projectKey"

    //PAYNUM	LAKNUM	PAYHESH	DATEJOIN	DATEOPEN	DATECLOSE	DATECANCEL	CANCELCOSE	PAYSHEKEL	PAYDOLAR	
    //MCHNUM	PAYCOSE	PAYDESTENY	PAYSTATUS	PAYREM	PAYNAME	PAYMAKAV	NORMALLATE	ISHURBANK	PAYPLACE	DATEMAKAV	PAYZACAUT2	PAYCITY	PAYKESHER


};var handleGetPrograms = function handleGetPrograms(records) {
    return records.map(function (program) {
        var bankAccount = program.bankAccount && program.bankAccount.split(" ");

        return Object.assign({}, program, {
            bankAccount: bankAccount && {
                bank: bankAccount[0],
                branch: bankAccount[1],
                account: bankAccount[2]
            }
        });
    });
};

var ProgramReader = function () {
    function ProgramReader(organizationKey) {
        _classCallCheck(this, ProgramReader);

        var dataPath = process.env.DBPATH;

        this.path = dataPath + "\\" + organizationKey + "\\PAY.DBF";
    }

    _createClass(ProgramReader, [{
        key: "getPrograms",
        value: function getPrograms() {
            return _dbfReader2.default.read(this.path, dbfMapping).then(function (data) {
                return handleGetPrograms(data.records);
            });
        }
    }]);

    return ProgramReader;
}();

exports.default = ProgramReader;