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

var DisplaySet = function (_Component) {
    _inherits(DisplaySet, _Component);

    function DisplaySet(props) {
        _classCallCheck(this, DisplaySet);

        return _possibleConstructorReturn(this, (DisplaySet.__proto__ || Object.getPrototypeOf(DisplaySet)).call(this, props));
    }

    _createClass(DisplaySet, [{
        key: 'render',
        value: function render() {
            var jSet = JSON.parse(this.props.set);
            var uploadDate, setId;
            var filenames = [];
            jSet.map(function (item, i) {
                if (item['Upload Date']) {
                    uploadDate = item['Upload Date'];

                    uploadDate = new Date(uploadDate);
                    var hours = uploadDate.getHours();
                    var minutes = uploadDate.getMinutes();
                    var ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // the hour '0' should be '12'
                    minutes = minutes < 10 ? '0' + minutes : minutes;
                    var strTime = hours + ':' + minutes + ' ' + ampm;

                    uploadDate = uploadDate.getMonth() + 1 + '/' + uploadDate.getDate() + '/' + uploadDate.getFullYear() + ' ' + strTime;
                } else if (item['SetId']) {
                    setId = item['SetId'];
                } else if (item['filename']) {
                    filenames.push(item['filename']);
                }
            });
            return _react2.default.createElement(
                'div',
                { className: 'file-set-container', 'data-setid': setId },
                _react2.default.createElement(
                    'div',
                    { className: 'file-row clear' },
                    _react2.default.createElement(
                        'div',
                        { className: 'file-set' },
                        _react2.default.createElement(
                            'h2',
                            null,
                            'Uploaded on ',
                            uploadDate,
                            ' for review:'
                        ),
                        filenames.map(function (item, i) {
                            return _react2.default.createElement(
                                'div',
                                { className: 'file-item', key: i },
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    item
                                )
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'file-action' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-checkin' },
                            'Approve'
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-reset' },
                            'Reject'
                        )
                    )
                )
            );
        }
    }]);

    return DisplaySet;
}(_react.Component);

exports.default = DisplaySet;