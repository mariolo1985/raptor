'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Attachment = function (_Component) {
    _inherits(Attachment, _Component);

    function Attachment(props) {
        _classCallCheck(this, Attachment);

        var _this = _possibleConstructorReturn(this, (Attachment.__proto__ || Object.getPrototypeOf(Attachment)).call(this, props));

        _this.state = {
            files: []
        };

        _this.onDrop = _this.onDrop.bind(_this);
        return _this;
    }

    _createClass(Attachment, [{
        key: 'onDrop',
        value: function onDrop(acceptedFiles, rejectedFiles) {
            this.setState({
                files: acceptedFiles
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _reactDropzone2.default,
                    { onDrop: this.onDrop, disabledClick: 'true', multiple: true },
                    _react2.default.createElement(
                        'p',
                        null,
                        'Drop something here'
                    )
                ),
                this.state.files.length > 0 ? _react2.default.createElement(
                    'div',
                    null,
                    this.state.files.map(function (file) {
                        return _react2.default.createElement('img', { src: file.preview });
                    })
                ) : null
            );
        }
    }]);

    return Attachment;
}(_react.Component);

exports.default = Attachment;