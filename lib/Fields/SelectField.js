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

var SelectField = function SelectField(_ref) {
  var label = _ref.label,
      error = _ref.error,
      options = _ref.options,
      input = (0, _objectWithoutProperties2.default)(_ref, ["label", "error", "options"]);
  return _react.default.createElement(_Wrapper.default, (0, _extends2.default)({
    label: label,
    error: error
  }, input), _react.default.createElement("select", input, options.map(function (item) {
    return _react.default.createElement("option", {
      key: item.value,
      value: item.value
    }, item.label);
  })));
};

SelectField.propTypes = {
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string,
    value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
  })),
  error: _propTypes.default.bool.isRequired,
  label: _propTypes.default.string
};
SelectField.defaultProps = {
  label: '',
  options: []
};

var _default = (0, _withContextForm.default)(_react.default.memo(SelectField));

exports.default = _default;