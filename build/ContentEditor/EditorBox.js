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

var EditorBox = function (_Component) {
    _inherits(EditorBox, _Component);

    function EditorBox(props) {
        _classCallCheck(this, EditorBox);

        var _this = _possibleConstructorReturn(this, (EditorBox.__proto__ || Object.getPrototypeOf(EditorBox)).call(this, props));

        _this.state = {
            editor: null
        };

        _this.componentDidMount = _this.componentDidMount.bind(_this);
        _this.onEditorCancel = _this.onEditorCancel.bind(_this);
        _this.onEditorCheckin = _this.onEditorCheckin.bind(_this);
        _this.onEditorSaved = _this.onEditorSaved.bind(_this);

        return _this;
    }

    _createClass(EditorBox, [{
        key: 'onEditorCancel',
        value: function onEditorCancel() {
            console.log('editor cancel');
            //var editor = this.state.editor;
            console.log(editor.getContent());
        }
    }, {
        key: 'onEditorCheckin',
        value: function onEditorCheckin() {
            console.log('editor checkin');
            // SAVE COMMENTS TO FILE


            //this.props.onPostFiles();// SAVES TO DIRECTORY
        }
    }, {
        key: 'onEditorSaved',
        value: function onEditorSaved(regions) {
            console.log('on editor saved');
        }
    }, {
        key: 'createEditor',
        value: function createEditor() {
            var temp = tinymce.init({
                selector: '.editor',
                plugins: ['link', 'image', 'media'],
                default_link_target: '_blank',
                inline: true,
                fixed_toolbar_container: '.toolbar',
                menubar: false,
                toolbar: ['fontsizeselect bold italic underline | outdent indent | bullist numlist | link unlink | image media']
            });

            return temp;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            // CREATE EDITOR / RICH TEXT BOX
            //var editor = this.createEditor()[0];
            this.props.onInitEditor();
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { className: 'attachment-editor-wrapper' },
                _react2.default.createElement(
                    'h3',
                    null,
                    'Enter Check-In Comments:'
                ),
                _react2.default.createElement('div', { className: 'toolbar' }),
                _react2.default.createElement('div', { className: 'editor' }),
                _react2.default.createElement(
                    'div',
                    { className: 'action-buttons' },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-cancel', onClick: this.onEditorCancel },
                        'Cancel'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-reset' },
                        'Reset Form'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-checkin', onClick: this.onEditorCheckin },
                        'Check In'
                    )
                )
            );
        }
    }]);

    return EditorBox;
}(_react.Component);

exports.default = EditorBox;