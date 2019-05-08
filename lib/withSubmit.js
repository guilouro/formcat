"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _create = require("./create");

var withSubmit = function withSubmit(WrapperComponent) {
  return function (props) {
    return _react.default.createElement(_create.Consumer, null, function (_ref) {
      var isValid = _ref.isValid;
      return _react.default.createElement(WrapperComponent, (0, _extends2.default)({
        type: "submit"
      }, props, {
        disabled: !isValid
      }));
    });
  };
};

var _default = withSubmit;
exports.default = _default;