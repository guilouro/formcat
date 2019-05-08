"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withContextForm = _interopRequireDefault(require("../withContextForm"));

var _Wrapper = _interopRequireDefault(require("./Wrapper"));

var TextField = function TextField(_ref) {
  var label = _ref.label,
      error = _ref.error,
      input = (0, _objectWithoutProperties2.default)(_ref, ["label", "error"]);
  return _react.default.createElement(_Wrapper.default, (0, _extends2.default)({
    label: label,
    error: error
  }, input), _react.default.createElement("textarea", input));
};

TextField.propTypes = {
  error: _propTypes.default.bool.isRequired,
  label: _propTypes.default.string
};
TextField.defaultProps = {
  label: ''
};

var _default = (0, _withContextForm.default)(_react.default.memo(TextField));

exports.default = _default;