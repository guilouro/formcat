import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';
import { Provider } from './create';
import PropTypes from 'prop-types';

class Form extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    onFormChange: PropTypes.func,
    children: PropTypes.any.isRequired,
    keyUpValidation: PropTypes.bool,
  };

  static defaultProps = {
    onSubmit: undefined,
    onFormChange: undefined,
    keyUpValidation: false,
  };

  state = {
    registeredFields: {},
    isValid: true,
  };

  componentWillUnmount() {
    this.validateForm.cancel();
    this.onKeyUp.cancel();
  }

  onSubmit = async e => {
    e.preventDefault();
    if (!this.props.onSubmit) {
      return false;
    }

    const data = Object.keys(this.state.registeredFields).map(key => ({
      [key]: this.state.registeredFields[key].value,
    }));

    const field = {};
    Object.keys(this.state.registeredFields).forEach(key => {
      const { validations, ...rest } = this.state.registeredFields[key];
      field[key] = {
        ...rest,
      };
    });

    this.props.onSubmit({
      error: await this.hasError(),
      data,
      field,
    });
  };

  onFormChange = ({ name, type, value }) => {
    if (this.props.onFormChange) {
      this.props.onFormChange({ name, type, value });
    }
  };

  onRegister = (name, type, value) => {
    this.registerUpdate(name, type, value);
  };

  onKeyUp = debounce(e => {
    const { name, value } = e.target;
    if (this.state.registeredFields[name].touched) {
      this.doValidate(name, value);
    }
  }, 250);

  unRegister = name => {
    const { registeredFields } = this.state;
    delete registeredFields[name];
    this.setState({ registeredFields });
  };

  hasError = async () => {
    const { registeredFields } = this.state;
    const fields = Object.keys(registeredFields).filter(
      name => registeredFields[name].validations.length
    );

    await Promise.all(
      fields.map(name => this.doValidate(name, registeredFields[name].value))
    );

    return !fields.every(
      name => this.state.registeredFields[name].error === false
    );
  };

  handleChange = e => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    this.registerUpdate(name, 'value', value);
  };

  handleBlur = e => {
    const { name, value } = e.target;
    this.registerUpdate(name, 'active', false);
    this.registerUpdate(name, 'touched', true);
    this.doValidate(name, value);
  };

  handleKeyUp = e => {
    if (!this.props.keyUpValidation) return;

    e.persist();
    this.onKeyUp(e);
  };

  handleFocus = e => {
    const { name } = e.target;
    this.registerUpdate(name, 'active', true);
  };

  isValidField = (name, value) => {
    const { validations, required } = this.state.registeredFields[name];
    const { registeredFields } = this.state;
    return validations.every(
      func => (value === '' && !required) || func(value, registeredFields)
    );
  };

  doValidate = (name, value) => {
    const hasError = !this.isValidField(name, value);
    return Promise.all([
      this.registerUpdate(name, 'error', hasError),
      this.registerUpdate(name, 'touched', true),
    ]);
  };

  validateForm = debounce(() => {
    const fields = Object.keys(this.state.registeredFields).filter(
      name => this.state.registeredFields[name].validations.length
    );

    const isValid = fields.every(name => {
      const { value } = this.state.registeredFields[name];
      return this.isValidField(name, value);
    });

    this.setState({ isValid });
  }, 250);

  updateFieldValue = (name, value) => {
    this.registerUpdate(name, 'value', value).then(() => {
      this.doValidate(name, value);
    });
  };

  registerUpdate = (name, type, value) =>
    new Promise(resolve => {
      this.setState(
        prevState => ({
          registeredFields: {
            ...prevState.registeredFields,
            [name]: {
              ...prevState.registeredFields[name],
              [type]: value,
            },
          },
        }),
        () => {
          this.onFormChange({ name, type, value });
          this.validateForm();
          resolve();
        }
      );
    });

  render() {
    return (
      <Provider
        value={{
          registeredFields: this.state.registeredFields,
          isValid: this.state.isValid,
          onRegister: this.onRegister,
          unRegister: this.unRegister,
          onChange: this.handleChange,
          onBlur: this.handleBlur,
          onKeyUp: this.handleKeyUp,
          onFocus: this.handleFocus,
        }}
      >
        <form onSubmit={this.onSubmit} noValidate>
          {this.props.children}
        </form>
      </Provider>
    );
  }
}

export default Form;
