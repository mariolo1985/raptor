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

        var _this = _possibleConstructorReturn(this, (DisplaySet.__proto__ || Object.getPrototypeOf(DisplaySet)).call(this, props));

        _this.updateWorkflowStatus = _this.updateWorkflowStatus.bind(_this);
        return _this;
    }

    _createClass(DisplaySet, [{
        key: 'createMarkup',
        value: function createMarkup(html) {
            // CREATE MARKUP FOR HTML INJECTION
            return { __html: html };
        }
    }, {
        key: 'makeDate',
        value: function makeDate(uploadDate) {
            // PARSE DATE AND RETURN AS READABLE STRING
            uploadDate = new Date(uploadDate);

            var hours = uploadDate.getHours();
            var minutes = uploadDate.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;

            uploadDate = uploadDate.getMonth() + 1 + '/' + uploadDate.getDate() + '/' + uploadDate.getFullYear() + ' ' + strTime;

            return uploadDate;
        }
    }, {
        key: 'updateWorkflowStatus',
        value: function updateWorkflowStatus(setid, status) {
            // DB UPDATE SUCCESS        
            $.ajax({
                url: './services/updatestatus.php',
                type: 'POST',
                data: {
                    SetId: setid,
                    Status: status
                }
            }).done(function (result) {
                this.props.refresh();
            }.bind(this));
        }
    }, {
        key: 'parseSetJson',
        value: function parseSetJson(jSet) {
            var item = jSet[0];

            var comments, tempComments;

            comments = item['Comments'];
            comments = this.createMarkup(comments);

            var SetInfo = {};
            SetInfo.SetId = item['SetId'];
            SetInfo.UploadDate = this.makeDate(item['UploadDate']);
            SetInfo.WorkflowStatus = item['WorkflowStatus'];
            SetInfo.Comments = comments;
            SetInfo.Filenames = item['Filenames'];

            return SetInfo;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var jSet;
            jSet = JSON.parse(this.props.set);

            var info = this.parseSetJson(jSet);
            var uploadDate,
                setId,
                wfStatus,
                comments = "",
                filenames = [];

            uploadDate = info.UploadDate;
            setId = info.SetId;
            wfStatus = info.WorkflowStatus;
            comments = info.Comments;
            filenames = info.Filenames;

            var setTitle = "Uploaded: " + uploadDate;
            var isPending = wfStatus == "PENDING" ? true : false;
            var statusRowClass = isPending ? 'file-status-row pending' : 'file-status-row approved';
            return _react2.default.createElement(
                'div',
                { className: 'file-set-container', 'data-setid': setId },
                _react2.default.createElement(
                    'div',
                    { className: 'file-row clear' },
                    _react2.default.createElement(
                        'div',
                        { className: statusRowClass },
                        _react2.default.createElement(
                            'span',
                            { className: 'file-status' },
                            wfStatus
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'file-set' },
                        _react2.default.createElement(
                            'p',
                            { className: 'file-set-title' },
                            setTitle
                        ),
                        filenames.map(function (item, i) {
                            var fn = item['filename'];
                            var link = './pending_elements/' + setId + '/' + fn;
                            return _react2.default.createElement(
                                'div',
                                { className: 'file-item', key: i },
                                _react2.default.createElement(
                                    'a',
                                    { className: 'file-link', href: link },
                                    fn
                                )
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'file-comments-container' },
                        _react2.default.createElement(
                            'span',
                            { className: 'file-comments-heading' },
                            'Comments:'
                        ),
                        _react2.default.createElement('div', { className: 'file-comments', dangerouslySetInnerHTML: comments })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'file-action' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn btn-reset' },
                            'Reject'
                        ),
                        isPending ? _react2.default.createElement(
                            'button',
                            { className: 'btn btn-checkin', onClick: function onClick() {
                                    return _this2.updateWorkflowStatus(setId, 'APPROVED');
                                } },
                            'Approve'
                        ) : _react2.default.createElement(
                            'button',
                            { className: 'btn btn-checkin', onClick: function onClick() {
                                    return _this2.updateWorkflowStatus(setId, 'IMPLEMENTED');
                                } },
                            'Implement'
                        )
                    )
                )
            );
        }
    }]);

    return DisplaySet;
}(_react.Component);

exports.default = DisplaySet;