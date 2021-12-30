'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _consolidatedEvents = require('consolidated-events');

var _document = require('document.contains');

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DISPLAY = {
  BLOCK: 'block',
  FLEX: 'flex',
  INLINE: 'inline',
  INLINE_BLOCK: 'inline-block',
  CONTENTS: 'contents'
};
var pseudoObjectValues = function pseudoObjectValues(obj) {
  var objValues = [];
  for (var val in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, val)) {
      objValues.push(obj[val]);
    }
  }
  return objValues;
};
var DISPLAY_VALUES = pseudoObjectValues(DISPLAY);

var propTypes = {
  children: _propTypes2.default.node.isRequired,
  onOutsideClick: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool,
  useCapture: _propTypes2.default.bool,
  display: _propTypes2.default.oneOf(DISPLAY_VALUES),
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func
};

var defaultProps = {
  disabled: false,
  useCapture: true,
  display: DISPLAY.BLOCK
};

var OutsideClickHandler = function (_React$Component) {
  _inherits(OutsideClickHandler, _React$Component);

  function OutsideClickHandler() {
    var _ref;

    _classCallCheck(this, OutsideClickHandler);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = OutsideClickHandler.__proto__ || Object.getPrototypeOf(OutsideClickHandler)).call.apply(_ref, [this].concat(args)));

    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.setChildNodeRef = _this.setChildNodeRef.bind(_this);
    return _this;
  }

  _createClass(OutsideClickHandler, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          disabled = _props.disabled,
          useCapture = _props.useCapture;


      if (!disabled) this.addMouseDownEventListener(useCapture);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(_ref2) {
      var prevDisabled = _ref2.disabled;
      var _props2 = this.props,
          disabled = _props2.disabled,
          useCapture = _props2.useCapture;

      if (prevDisabled !== disabled) {
        if (disabled) {
          this.removeEventListeners();
        } else {
          this.addMouseDownEventListener(useCapture);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeEventListeners();
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      var useCapture = this.props.useCapture;


      var isDescendantOfRoot = this.childNode && (0, _document2.default)(this.childNode, e.target);
      if (!isDescendantOfRoot) {
        if (this.removeMouseUp) {
          this.removeMouseUp();
          this.removeMouseUp = null;
        }
        this.removeMouseUp = (0, _consolidatedEvents.addEventListener)(document, 'mouseup', this.onMouseUp, { capture: useCapture });
      }
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      var onOutsideClick = this.props.onOutsideClick;


      var isDescendantOfRoot = this.childNode && (0, _document2.default)(this.childNode, e.target);
      if (this.removeMouseUp) {
        this.removeMouseUp();
        this.removeMouseUp = null;
      }

      if (!isDescendantOfRoot) {
        onOutsideClick(e);
      }
    }
  }, {
    key: 'setChildNodeRef',
    value: function setChildNodeRef(ref) {
      this.childNode = ref;
    }
  }, {
    key: 'addMouseDownEventListener',
    value: function addMouseDownEventListener(useCapture) {
      this.removeMouseDown = (0, _consolidatedEvents.addEventListener)(document, 'mousedown', this.onMouseDown, { capture: useCapture });
    }
  }, {
    key: 'removeEventListeners',
    value: function removeEventListeners() {
      if (this.removeMouseDown) this.removeMouseDown();
      if (this.removeMouseUp) this.removeMouseUp();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          children = _props3.children,
          display = _props3.display;

      return _react2.default.createElement(
        'div',
        {
          ref: this.setChildNodeRef,
          style: display !== DISPLAY.BLOCK && DISPLAY_VALUES.includes(display) ? { display: display } : undefined,
          className: this.props.className,
          onClick: this.props.onClick
        },
        children
      );
    }
  }]);

  return OutsideClickHandler;
}(_react2.default.Component);

exports.default = OutsideClickHandler;


OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;