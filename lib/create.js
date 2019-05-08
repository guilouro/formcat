"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.Provider = void 0;

var _react = require("react");

var FormContext = (0, _react.createContext)({
  registeredFields: {},
  isValid: true,
  onRegister: undefined,
  onChange: undefined,
  onKeyUp: undefined,
  onBlur: undefined,
  onFocus: undefined
});
var Provider = FormContext.Provider,
    Consumer = FormContext.Consumer;
exports.Consumer = Consumer;
exports.Provider = Provider;