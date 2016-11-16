'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileDisplay = function (_Component) {
    _inherits(FileDisplay, _Component);

    function FileDisplay(props) {
        _classCallCheck(this, FileDisplay);

        var _this = _possibleConstructorReturn(this, (FileDisplay.__proto__ || Object.getPrototypeOf(FileDisplay)).call(this, props));

        _this.state = {
            sets: []
        };

        _this.getPendingElements = _this.getPendingElements.bind(_this);
        _this.updateSets = _this.updateSets.bind(_this);

        _this.getPendingElements(); // GET PENDING ELEMENTS
        return _this;
    }

    _createClass(FileDisplay, [{
        key: 'getPendingElements',
        value: function (_getPendingElements) {
            function getPendingElements() {
                return _getPendingElements.apply(this, arguments);
            }

            getPendingElements.toString = function () {
                return _getPendingElements.toString();
            };

            return getPendingElements;
        }(function () {
            getPendingElements(this.updateSets);
        })
    }, {
        key: 'updateSets',
        value: function updateSets(sets) {
            this.setState({
                sets: sets
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'file-display-wrapper' },
                _react2.default.createElement(
                    'h1',
                    null,
                    '(',
                    this.state.sets.length,
                    ') Pending Sets In Review'
                ),
                this.state.sets.length > 0 ? this.state.sets.map(function (set, i) {
                    return _react2.default.createElement(_.DisplaySet, { set: set, key: i, refresh: _this2.getPendingElements });
                }) : null
            );
        }
    }]);

    return FileDisplay;
}(_react.Component);

exports.default = FileDisplay;