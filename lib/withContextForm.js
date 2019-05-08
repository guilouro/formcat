"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _get = _interopRequireDefault(require("lodash/get"));

var _create = require("./create");

var withContextForm = function withContextForm(WrapperComponent) {
  var Field =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(Field, _Component);

    function Field() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2.default)(this, Field);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Field)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleBlur", function (e) {
        _this.props.context.onBlur(e);

        if (_this.props.onBlur) {
          _this.props.onBlur(e);
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleKeyUp", function (e) {
        _this.props.context.onKeyUp(e);

        if (_this.props.onKeyUp) {
          _this.props.onKeyUp(e);
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (e) {
        _this.props.context.onChange(e);

        if (_this.props.onChange) {
          _this.props.onChange(e);
        }
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleFocus", function (e) {
        _this.props.context.onFocus(e);

        if (_this.props.onFocus) {
          _this.props.onFocus(e);
        }
      });
      return _this;
    }

    (0, _createClass2.default)(Field, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.context.onRegister(this.props.name, 'value', this.props.defaultValue || this.props.defaultChecked || '');
        this.props.context.onRegister(this.props.name, 'checked', this.props.defaultChecked);
        this.props.context.onRegister(this.props.name, 'required', this.props.required);
        this.props.context.onRegister(this.props.name, 'validations', [].concat((0, _toConsumableArray2.default)(this.props.validations), (0, _toConsumableArray2.default)(this.props.required ? [function (value) {
          return !!value;
        }] : [])));
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.context.unRegister(this.props.name);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            context = _this$props.context,
            validations = _this$props.validations,
            defaultValue = _this$props.defaultValue,
            defaultChecked = _this$props.defaultChecked,
            props = (0, _objectWithoutProperties2.default)(_this$props, ["context", "validations", "defaultValue", "defaultChecked"]);
        var value = (0, _get.default)(context.registeredFields[props.name], 'value', '');
        var checked = (0, _get.default)(context.registeredFields[props.name], 'checked', false);
        var error = (0, _get.default)(context.registeredFields[props.name], 'error', false);
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(WrapperComponent, (0, _extends2.default)({}, props, {
          value: value,
          error: error,
          checked: checked,
          onChange: this.handleChange,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyUp: this.handleKeyUp
        })));
      }
    }]);
    return Field;
  }(_react.Component);

  (0, _defineProperty2.default)(Field, "propTypes", {
    context: _propTypes.default.object.isRequired,
    name: _propTypes.default.string.isRequired,
    onBlur: _propTypes.default.func,
    onKeyUp: _propTypes.default.func,
    onFocus: _propTypes.default.func,
    onChange: _propTypes.default.func,
    defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool]),
    defaultChecked: _propTypes.default.bool,
    required: _propTypes.default.bool,
    validations: _propTypes.default.arrayOf(_propTypes.default.func)
  });
  (0, _defineProperty2.default)(Field, "defaultProps", {
    onBlur: undefined,
    onKeyUp: undefined,
    onFocus: undefined,
    onChange: undefined,
    defaultValue: '',
    defaultChecked: false,
    required: false,
    validations: []
  });
  return function (props) {
    return _react.default.createElement(_create.Consumer, null, function (_ref) {
      var registeredFields = _ref.registeredFields,
          onRegister = _ref.onRegister,
          unRegister = _ref.unRegister,
          onChange = _ref.onChange,
          onBlur = _ref.onBlur,
          onKeyUp = _ref.onKeyUp,
          onFocus = _ref.onFocus;
      return _react.default.createElement(Field, (0, _extends2.default)({}, props, {
        context: {
          registeredFields: registeredFields,
          onRegister: onRegister,
          unRegister: unRegister,
          onChange: onChange,
          onBlur: onBlur,
          onKeyUp: onKeyUp,
          onFocus: onFocus
        }
      }));
    });
  };
};

var _default = withContextForm;
exports.default = _default;