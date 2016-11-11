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

var MainNav = function (_Component) {
    _inherits(MainNav, _Component);

    function MainNav(props) {
        _classCallCheck(this, MainNav);

        return _possibleConstructorReturn(this, (MainNav.__proto__ || Object.getPrototypeOf(MainNav)).call(this, props));
    }

    _createClass(MainNav, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'header-wrapper clear' },
                _react2.default.createElement(
                    'div',
                    { className: 'logo-header header-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'logo' },
                        _react2.default.createElement(
                            'a',
                            { href: '/raptor', className: 'header-logo-link' },
                            _react2.default.createElement('img', { src: './images/raptor.png', className: 'header-img', alt: 'raptor.com' })
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            'RAPTOR'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'menu-wrapper header-content' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'menu clear' },
                        _react2.default.createElement(
                            'li',
                            { className: 'menu-item' },
                            _react2.default.createElement(
                                'a',
                                { href: './index.html', className: 'menu-link' },
                                'Add Elements'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'menu-item' },
                            _react2.default.createElement(
                                'a',
                                { href: './review.html', className: 'menu-link' },
                                'Review'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'menu-item' },
                            _react2.default.createElement(
                                'a',
                                { href: './history.html', className: 'menu-link' },
                                'History'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'search-wrapper header-content' },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn-search' },
                        _react2.default.createElement('i', { className: 'fa fa-search' })
                    )
                )
            );
        }
    }]);

    return MainNav;
}(_react.Component);

exports.default = MainNav;