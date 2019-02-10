'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fee = require('./fee.reader');

var _fee2 = _interopRequireDefault(_fee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DollarRateService = function () {
    function DollarRateService() {
        _classCallCheck(this, DollarRateService);

        this.FeeReader = new _fee2.default();
    }

    _createClass(DollarRateService, [{
        key: 'getDollarRate',
        value: function getDollarRate(collectionDate) {
            return this.FeeReader.getFees(collectionDate).then(function (data) {
                return data.length ? data[0].dollarRate : undefined;
            });
        }
    }]);

    return DollarRateService;
}();

exports.default = DollarRateService;