'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _program = require('../programs/program.service');

var _program2 = _interopRequireDefault(_program);

var _collection = require('./collection.reader');

var _collection2 = _interopRequireDefault(_collection);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CollectionService = function () {
    function CollectionService(organizationKey) {
        _classCallCheck(this, CollectionService);

        this.ProgramService = new _program2.default(organizationKey);
        this.CollectionReader = new _collection2.default(organizationKey);
    }

    _createClass(CollectionService, [{
        key: 'getCollections',
        value: function getCollections(collectionDate) {
            return this.CollectionReader.getCollections();
        }
    }, {
        key: 'getCollectionsByDate',
        value: function getCollectionsByDate(collectionDate) {
            var getCollectionsPromise = this.CollectionReader.getCollections().then(function (data) {
                return data.filter(function (clc) {
                    return (0, _dateformat2.default)(new Date(clc.date), "ddmmyyyy") === (0, _dateformat2.default)(new Date(collectionDate), "ddmmyyyy");
                });
            });
            var getProgramsPromise = this.ProgramService.getPrograms();

            return Promise.all([getCollectionsPromise, getProgramsPromise]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    collections = _ref2[0],
                    programs = _ref2[1];

                return collections.map(function (clc) {
                    var program = programs.find(function (prg) {
                        return prg.key == clc.programKey;
                    });
                    return Object.assign({}, clc, { program: program });
                });
            });
        }
    }]);

    return CollectionService;
}();

exports.default = CollectionService;