'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _ = require('../');

var _ContentEditor = require('../ContentEditor');

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
        value: function onDrop(results) {
            this.setState({
                files: results
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var highDetails = this.state.files.length + " File(s) To Be Checked-In";
            return _react2.default.createElement(
                'div',
                { className: 'attachment-wrapper' },
                _react2.default.createElement(
                    'div',
                    { className: 'attachment-zone' },
                    _react2.default.createElement(
                        'h1',
                        { className: 'center-helper' },
                        'Attach New Elements For Preview'
                    ),
                    _react2.default.createElement(
                        _reactDropzone2.default,
                        { className: 'attachments', activeClassName: 'dragon', onDrop: this.onDrop, disableClick: true, multiple: true },
                        _react2.default.createElement(
                            'div',
                            { className: 'default-msg' },
                            _react2.default.createElement(
                                'p',
                                { className: 'attachment-instructions' },
                                'Drop Files Here'
                            ),
                            _react2.default.createElement('i', { className: 'attachment-flair fa fa-anchor' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'dragged-msg' },
                            _react2.default.createElement(
                                'p',
                                { className: 'attachment-instructions' },
                                'Drop to upload'
                            ),
                            _react2.default.createElement('i', { className: 'attachment-flair fa fa-telegram' })
                        )
                    )
                ),
                this.state.files.length > 0 ? _react2.default.createElement(
                    'div',
                    { className: 'attachment-preview clear' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'high-details' },
                        highDetails
                    ),
                    this.state.files.map(function (file, i) {
                        var opt = {
                            file: file,
                            childKey: i
                        };
                        return _react2.default.createElement(_.FilePreview, _extends({}, opt, { key: i }));
                    }),
                    _react2.default.createElement(_ContentEditor.EditorBox, null)
                ) : null
            );
        }
    }]);

    return Attachment;
}(_react.Component);

exports.default = Attachment;