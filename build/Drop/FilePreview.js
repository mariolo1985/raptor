"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilePreview = function (_Component) {
    _inherits(FilePreview, _Component);

    function FilePreview(props) {
        _classCallCheck(this, FilePreview);

        return _possibleConstructorReturn(this, (FilePreview.__proto__ || Object.getPrototypeOf(FilePreview)).call(this, props));
    }

    _createClass(FilePreview, [{
        key: "render",
        value: function render() {
            var key = this.props.childKey;
            var fileCounter = key + 1;
            var file = this.props.file,
                filename = file.name,
                extIndex = filename.lastIndexOf("."),
                fileExt = filename.substring(extIndex + 1);
            var isSketchFile = false;

            if (fileExt.toLowerCase() == "sketch") {
                isSketchFile = true;
            }

            return _react2.default.createElement(
                "div",
                { className: "attachment-item" },
                _react2.default.createElement(
                    "div",
                    { className: "center-helper" },
                    _react2.default.createElement(
                        "h3",
                        { className: "attachment-counter" },
                        "File ",
                        fileCounter
                    ),
                    _react2.default.createElement("i", { className: "file-icon fa fa-file-image-o" }),
                    _react2.default.createElement(
                        "span",
                        { className: "attachment-filename" },
                        file.name
                    )
                )
            );
        }
    }]);

    return FilePreview;
}(_react.Component);

exports.default = FilePreview;