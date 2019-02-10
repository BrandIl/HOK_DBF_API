'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _organization = require('./organization.reader');

var _organization2 = _interopRequireDefault(_organization);

var _project = require('./project.reader');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrganizationService = function () {
    function OrganizationService() {
        _classCallCheck(this, OrganizationService);

        this.OrganizationReader = new _organization2.default();
    }

    _createClass(OrganizationService, [{
        key: 'getOrganizations',
        value: function getOrganizations() {
            return this.OrganizationReader.getOrganizations();
        }
    }, {
        key: 'getOrganization',
        value: function getOrganization(key) {
            var getProjectPromise = new _project2.default(key).getProjects();
            var getOrganizationPromise = this.OrganizationReader.getOrganization(key);
            return Promise.all([getOrganizationPromise, getProjectPromise]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    org = _ref2[0],
                    projects = _ref2[1];

                return Object.assign({}, org, { projects: projects });
            });
        }
    }, {
        key: 'getProjects',
        value: function getProjects(key) {
            return new _project2.default(key).getProjects();
        }
    }]);

    return OrganizationService;
}();

exports.default = OrganizationService;