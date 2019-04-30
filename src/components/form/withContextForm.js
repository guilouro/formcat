import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Consumer } from './create';

const withContextForm = WrapperComponent => {
  class Field extends Component {
    static propTypes = {
      context: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      onBlur: PropTypes.func,
      onKeyUp: PropTypes.func,
      onFocus: PropTypes.func,
      onChange: PropTypes.func,
      defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      required: PropTypes.bool,
      validations: PropTypes.arrayOf(
        PropTypes.func,
      ),
    }

    static defaultProps = {
      onBlur: undefined,
      onKeyUp: undefined,
      onFocus: undefined,
      onChange: undefined,
      maxLength: undefined,
      defaultValue: '',
      required: false,
      validations: [],
    }

    componentDidMount() {
      this.props.context.onRegister(this.props.name, 'value', this.props.defaultValue);
      this.props.context.onRegister(this.props.name, 'required', this.props.required);
      this.props.context.onRegister(this.props.name, 'validations', [
        ...this.props.validations,
        ...this.props.required ? [(value) => !!value] : [],
      ]);
    }

    componentWillUnmount() {
      this.props.context.unRegister(this.props.name);
    }

    handleBlur = (e) => {
      this.props.context.onBlur(e);
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }

    handleKeyUp = (e) => {
      this.props.context.onKeyUp(e);
      if (this.props.onKeyUp) {
        this.props.onKeyUp(e);
      }
    }

    handleChange = (e) => {
      this.props.context.onChange(e);
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }

    handleFocus = (e) => {
      this.props.context.onFocus(e);
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }

    render() {
      const { context, validations, defaultValue, ...props } = this.props;

      const value = get(context.registeredFields[props.name], 'value', '');
      const error = get(context.registeredFields[props.name], 'error', false);

      return (
        <React.Fragment>
          <WrapperComponent
            {...props}
            value={value}
            error={error}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyUp={this.handleKeyUp}
          />
        </React.Fragment>
      )
    }
  }

  return props => (
    <Consumer>
      {({
        registeredFields,
        onRegister,
        unRegister,
        onChange,
        onBlur,
        onKeyUp,
        onFocus
      }) => (
          <Field
            {...props}
            context={{
              registeredFields,
              onRegister,
              unRegister,
              onChange,
              onBlur,
              onKeyUp,
              onFocus
            }}
          />
        )}
    </Consumer>
  );
}

export default withContextForm;
