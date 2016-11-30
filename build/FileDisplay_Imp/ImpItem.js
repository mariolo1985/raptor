'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImpItem = function (_Component) {
    _inherits(ImpItem, _Component);

    function ImpItem(props) {
        _classCallCheck(this, ImpItem);

        return _possibleConstructorReturn(this, (ImpItem.__proto__ || Object.getPrototypeOf(ImpItem)).call(this, props));
    }

    _createClass(ImpItem, [{
        key: 'createMarkup',
        value: function createMarkup(html) {
            // CREATE MARKUP FOR HTML INJECTION
            return { __html: html };
        }
    }, {
        key: 'render',
        value: function render() {
            var jSet = JSON.parse(this.props.Set);
            var item = jSet[0];

            var setObj = {};
            setObj.SetId = item['SetId'];
            setObj.VersionNum = item['VersionNum'];
            setObj.VersionDate = item['VersionDate'];
            setObj.Comments = this.createMarkup(item['Comments']);
            setObj.Filenames = item['Filenames'];

            return _react2.default.createElement(
                'div',
                { className: 'file-set-container', 'data-setid': setObj.SetId },
                _react2.default.createElement(
                    'div',
                    { className: 'file-row clear' },
                    _react2.default.createElement(
                        'div',
                        { className: 'file-status-row approved' },
                        _react2.default.createElement(
                            'span',
                            { className: 'file-status' },
                            'Version ',
                            setObj.VersionNum
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'file-set' },
                        setObj.Filenames.length > 0 ? setObj.Filenames.map(function (filename, i) {
                            var link = './implemented_elements/' + setObj.SetId + '/' + filename['filename'];
                            return _react2.default.createElement(
                                'div',
                                { className: 'file-item', key: i },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'file-link', href: link },
                                    filename['filename']
                                )
                            );
                        }) : null
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'file-comments-container' },
                        _react2.default.createElement(
                            'span',
                            { className: 'file-comments-heading' },
                            'Comments:'
                        ),
                        _react2.default.createElement('div', { className: 'file-comments', dangerouslySetInnerHTML: setObj.Comments })
                    )
                )
            );
        } // end render

    }]);

    return ImpItem;
}(_react.Component);

exports.default = ImpItem;