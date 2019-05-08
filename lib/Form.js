"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _debounce = _interopRequireDefault(require("lodash/debounce"));

var _create = require("./create");

var _propTypes = _interopRequireDefault(require("prop-types"));

var Form =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Form, _PureComponent);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      registeredFields: {},
      isValid: true
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onSubmit",
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(e) {
        var data, field;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                data = {};
                field = {};
                Object.keys(_this.state.registeredFields).forEach(function (key) {
                  var _this$state$registere = _this.state.registeredFields[key],
                      validations = _this$state$registere.validations,
                      rest = (0, _objectWithoutProperties2.default)(_this$state$registere, ["validations"]);
                  data[key] = _this.state.registeredFields[key].value;
                  field[key] = (0, _objectSpread4.default)({}, rest);
                });
                _context.t0 = _this.props;
                _context.next = 7;
                return _this.hasError();

              case 7:
                _context.t1 = _context.sent;
                _context.t2 = data;
                _context.t3 = field;
                _context.t4 = {
                  error: _context.t1,
                  data: _context.t2,
                  field: _context.t3
                };

                _context.t0.onSubmit.call(_context.t0, _context.t4);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onFormChange", function (_ref2) {
      var name = _ref2.name,
          type = _ref2.type,
          value = _ref2.value;

      if (_this.props.onFormChange) {
        _this.props.onFormChange({
          name: name,
          type: type,
          value: value
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onRegister", function (name, type, value) {
      _this.registerUpdate(name, type, value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onKeyUp", (0, _debounce.default)(function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      if (_this.state.registeredFields[name].touched) {
        _this.doValidate(name, value);
      }
    }, 250));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "unRegister", function (name) {
      var registeredFields = _this.state.registeredFields;
      delete registeredFields[name];

      _this.setState({
        registeredFields: registeredFields
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "hasError",
    /*#__PURE__*/
    (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2() {
      var registeredFields, fields;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              registeredFields = _this.state.registeredFields;
              fields = Object.keys(registeredFields).filter(function (name) {
                return registeredFields[name].validations.length;
              });
              _context2.next = 4;
              return Promise.all(fields.map(function (name) {
                return _this.doValidate(name, registeredFields[name].value);
              }));

            case 4:
              return _context2.abrupt("return", !fields.every(function (name) {
                return _this.state.registeredFields[name].error === false;
              }));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (e) {
      var _e$target2 = e.target,
          name = _e$target2.name,
          type = _e$target2.type;

      if (type === 'checkbox') {
        _this.registerUpdate(name, 'value', e.target.checked);

        _this.registerUpdate(name, 'checked', e.target.checked);

        return;
      }

      _this.registerUpdate(name, 'value', e.target.value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleBlur", function (e) {
      var _e$target3 = e.target,
          name = _e$target3.name,
          value = _e$target3.value;

      _this.registerUpdate(name, 'active', false);

      _this.registerUpdate(name, 'touched', true);

      _this.doValidate(name, value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleKeyUp", function (e) {
      if (!_this.props.keyUpValidation) return;
      e.persist();

      _this.onKeyUp(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleFocus", function (e) {
      var name = e.target.name;

      _this.registerUpdate(name, 'active', true);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isValidField", function (name, value) {
      var _this$state$registere2 = _this.state.registeredFields[name],
          validations = _this$state$registere2.validations,
          required = _this$state$registere2.required;
      var registeredFields = _this.state.registeredFields;
      return validations.every(function (func) {
        return value === '' && !required || func(value, registeredFields);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "doValidate", function (name, value) {
      var hasError = !_this.isValidField(name, value);
      return Promise.all([_this.registerUpdate(name, 'error', hasError), _this.registerUpdate(name, 'touched', true)]);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "validateForm", (0, _debounce.default)(function () {
      var fields = Object.keys(_this.state.registeredFields).filter(function (name) {
        return _this.state.registeredFields[name].validations.length;
      });
      var isValid = fields.every(function (name) {
        var value = _this.state.registeredFields[name].value;
        return _this.isValidField(name, value);
      });

      _this.setState({
        isValid: isValid
      });
    }, 250));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "updateFieldValue", function (name, value) {
      _this.registerUpdate(name, 'value', value).then(function () {
        _this.doValidate(name, value);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "registerUpdate", function (name, type, value) {
      return new Promise(function (resolve) {
        _this.setState(function (prevState) {
          return {
            registeredFields: (0, _objectSpread4.default)({}, prevState.registeredFields, (0, _defineProperty2.default)({}, name, (0, _objectSpread4.default)({}, prevState.registeredFields[name], (0, _defineProperty2.default)({}, type, value))))
          };
        }, function () {
          _this.onFormChange({
            name: name,
            type: type,
            value: value
          });

          _this.validateForm();

          resolve();
        });
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Form, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.validateForm.cancel();
      this.onKeyUp.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_create.Provider, {
        value: {
          registeredFields: this.state.registeredFields,
          isValid: this.state.isValid,
          onRegister: this.onRegister,
          unRegister: this.unRegister,
          onChange: this.handleChange,
          onBlur: this.handleBlur,
          onKeyUp: this.handleKeyUp,
          onFocus: this.handleFocus
        }
      }, _react.default.createElement("form", {
        onSubmit: this.onSubmit,
        noValidate: true
      }, this.props.children));
    }
  }]);
  return Form;
}(_react.PureComponent);

(0, _defineProperty2.default)(Form, "propTypes", {
  onSubmit: _propTypes.default.func,
  onFormChange: _propTypes.default.func,
  children: _propTypes.default.any.isRequired,
  keyUpValidation: _propTypes.default.bool
});
(0, _defineProperty2.default)(Form, "defaultProps", {
  onSubmit: undefined,
  onFormChange: undefined,
  keyUpValidation: false
});
var _default = Form;
exports.default = _default;