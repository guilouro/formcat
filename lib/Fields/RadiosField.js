"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withContextForm = _interopRequireDefault(require("../withContextForm"));

var _Wrapper = _interopRequireDefault(require("./Wrapper"));

var RadiosField = function RadiosField(_ref) {
  var label = _ref.label,
      options = _ref.options,
      error = _ref.error,
      input = (0, _objectWithoutProperties2.default)(_ref, ["label", "options", "error"]);

  var _useState = (0, _react.useState)((options.find(function (item) {
    return item.checked;
  }) || {}).value),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      checkedItem = _useState2[0],
      setCheckedItem = _useState2[1];

  var handleClick = function handleClick(value) {
    setCheckedItem(value);
  };

  return _react.default.createElement(_react.default.Fragment, null, label && _react.default.createElement("label", null, label, " ", input.required && ' *'), options.map(function (item) {
    return _react.default.createElement(_Wrapper.default, (0, _extends2.default)({
      key: item.value,
      label: item.label,
      error: error
    }, input, {
      reverse: true
    }), _react.default.createElement("input", (0, _extends2.default)({}, input, {
      value: item.value,
      checked: item.value === checkedItem || item.value === input.value,
      onClick: function onClick() {
        return handleClick(item.value);
      },
      type: "radio"
    })));
  }));
};

RadiosField.propTypes = {
  options: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string,
    value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    checked: _propTypes.default.bool
  })),
  required: _propTypes.default.bool,
  error: _propTypes.default.bool.isRequired,
  label: _propTypes.default.string
};
RadiosField.defaultProps = {
  label: '',
  required: false,
  options: []
};

var _default = (0, _withContextForm.default)(_react.default.memo(RadiosField));

exports.default = _default;