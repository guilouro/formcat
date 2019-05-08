"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Wrapper = function Wrapper(_ref) {
  var label = _ref.label,
      required = _ref.required,
      children = _ref.children,
      error = _ref.error,
      reverse = _ref.reverse;

  var clone = _react.default.cloneElement(children, {
    id: label,
    className: error ? 'formcat-error' : ''
  });

  return _react.default.createElement("div", null, reverse && clone, _react.default.createElement("label", {
    htmlFor: label
  }, label, required && !reverse && ' *'), !reverse && clone);
};

Wrapper.propTypes = {
  required: _propTypes.default.bool,
  children: _propTypes.default.node,
  label: _propTypes.default.string,
  reverse: _propTypes.default.bool,
  error: _propTypes.default.bool
};
Wrapper.defaultProps = {
  label: '',
  required: false,
  error: false,
  reverse: false
};
var _default = Wrapper;
exports.default = _default;