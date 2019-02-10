"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbfReader = require("../common/dbfReader");

var _dbfReader2 = _interopRequireDefault(_dbfReader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dbfMapping = {
    "KOD": "key",
    "NAME": "name"
};

var handleGetProjects = function handleGetProjects(projects, mails) {
    return projects.filter(function (project) {
        return !!(project.name && project.key);
    }).map(function (project) {
        var mail = mails.find(function (mail) {
            return mail.key === project.key;
        });
        return Object.assign({}, project, {
            name: project.name && project['name'].split('').reverse().join(''),
            email: mail && mail.name
        });
    });
};

var ProjectReader = function () {
    function ProjectReader(organizationKey) {
        _classCallCheck(this, ProjectReader);

        var dataPath = process.env.DBPATH;

        this.path = dataPath + "\\" + organizationKey + "\\DESTENY.DBF";
        this.mailPath = dataPath + "\\" + organizationKey + "\\MAIL.DBF";
    }

    _createClass(ProjectReader, [{
        key: "getProjects",
        value: function getProjects() {
            var readProjectsPromise = _dbfReader2.default.read(this.path, dbfMapping);
            var readMailProjectsPromise = _dbfReader2.default.read(this.mailPath, dbfMapping);
            return Promise.all([readProjectsPromise, readMailProjectsPromise]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    projects = _ref2[0],
                    mails = _ref2[1];

                return handleGetProjects(projects.records, mails.records);
            });
        }
    }]);

    return ProjectReader;
}();

exports.default = ProjectReader;