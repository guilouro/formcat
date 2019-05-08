"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _withSubmit = _interopRequireDefault(require("../withSubmit"));

var Submit = (0, _withSubmit.default)(function (props) {
  return _react.default.createElement("button", props);
});
var _default = Submit;
exports.default = _default;