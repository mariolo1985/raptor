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
        _this.onEditorFocus = _this.onEditorFocus.bind(_this);
        _this.onEditorCancel = _this.onEditorCancel.bind(_this);
        _this.onEditorCheckin = _this.onEditorCheckin.bind(_this);
        _this.onEditorSaved = _this.onEditorSaved.bind(_this);

        return _this;
    }

    _createClass(EditorBox, [{
        key: 'onEditorFocus',
        value: function onEditorFocus() {
            console.log('focus fired');
            var editor = this.state.editor;
            editor.start();

            this.setState({
                editor: editor
            });
        }
    }, {
        key: 'onEditorCancel',
        value: function onEditorCancel() {
            console.log('editor cancel');
            var editor = this.state.editor;
            editor.stop(false);

            this.setState({
                editor: editor
            });
        }
    }, {
        key: 'onEditorCheckin',
        value: function onEditorCheckin() {
            console.log('editor checkin');
            this.props.onPostFiles();

            //var editor = this.state.editor;
            //editor.save(true);// TRIGGER SAVED EVENT LISTENER

            // do not update state yet
            // set state from oneditorsaved
        }
    }, {
        key: 'onEditorSaved',
        value: function onEditorSaved(regions) {
            console.log('on editor saved');
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            // CREATE EDITOR / RICH TEXT BOX
            var DEFAULT_TOOLS = [['bold', 'italic'], ['align-left', 'align-center', 'align-right'], ['unordered-list', 'ordered-list'], ['indent', 'unindent']];
            ContentTools.DEFAULT_TOOLS = DEFAULT_TOOLS;

            var editor = null;
            editor = ContentTools.EditorApp.get();
            editor.init('*[data-editable]', 'data-name'); // INIT EDITOR

            // EDITOR SAVED EVENT
            editor.addEventListener('saved', function (ev) {
                var regions = ev.detail().regions;
                console.log(regions);
                //this.onEditorSaved(regions);// when "saved" pass to onEditorSaved
            });

            this.setState({
                editor: editor
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'div',
                { className: 'attachment-editor-wrapper' },
                _react2.default.createElement(
                    'div',
                    { className: 'attachment-editor', tabIndex: '-1', 'data-editable': true, 'data-name': 'main-content', onFocus: this.onEditorFocus },
                    _react2.default.createElement('input', { type: 'text', disabled: true, placeholder: 'Enter Check-In Comments here....', className: 'editor-placeholder' }),
                    _react2.default.createElement('p', { className: 'editor-input' })
                ),
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