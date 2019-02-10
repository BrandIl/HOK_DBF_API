'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _program = require('./program.reader');

var _program2 = _interopRequireDefault(_program);

var _customer = require('./customer.reader');

var _customer2 = _interopRequireDefault(_customer);

var _project = require('../organization/project.reader');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProgramService = function () {
    function ProgramService(organizationKey) {
        _classCallCheck(this, ProgramService);

        this.ProgramReader = new _program2.default(organizationKey);
        this.CustomerReader = new _customer2.default(organizationKey);
        this.ProjectReader = new _project2.default(organizationKey);
    }

    _createClass(ProgramService, [{
        key: 'getPrograms',
        value: function getPrograms() {
            var getProgramsPromise = this.ProgramReader.getPrograms();
            var getCustomerPromise = this.CustomerReader.getCustomers();
            var getProjectPromise = this.ProjectReader.getProjects();
            return Promise.all([getProgramsPromise, getCustomerPromise, getProjectPromise]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 3),
                    programs = _ref2[0],
                    customers = _ref2[1],
                    projects = _ref2[2];

                return programs.map(function (prg) {
                    var customer = customers.find(function (csmr) {
                        return csmr.key == prg.customerKey;
                    });
                    var project = projects.find(function (prj) {
                        return prj.key == prg.projectKey;
                    });
                    return Object.assign({}, prg, { customer: customer }, { project: project });
                });
            });
        }
    }]);

    return ProgramService;
}();

exports.default = ProgramService;