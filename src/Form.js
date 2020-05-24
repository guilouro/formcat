import React, { PureComponent } from 'react'
import debounce from 'lodash.debounce'
import { Provider } from './create'
import PropTypes from 'prop-types'

class Form extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
    onFormChange: PropTypes.func,
    children: PropTypes.any.isRequired,
    keyUpValidation: PropTypes.bool,
    clearAfterSubmit: PropTypes.bool
  }

  static defaultProps = {
    onSubmit: undefined,
    onFormChange: undefined,
    keyUpValidation: false,
    clearAfterSubmit: false
  }

  state = {
    fields: {},
    isValid: true,
    initialData: {}
  }

  componentWillUnmount() {
    this.validateForm.cancel()
    this.onKeyUp.cancel()
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const data = {}
    const field = {}
    Object.keys(this.state.fields).forEach((key) => {
      const { validations, ...rest } = this.state.fields[key]
      data[key] = this.state.fields[key].value
      field[key] = { ...rest }
    })

    this.props.onSubmit({
      error: await this.hasError(),
      data,
      field
    })

    if (this.props.clearAfterSubmit) {
      this.resetForm()
    }
  }

  resetForm = () => {
    this.setState({ fields: this.state.initialData })
  }

  onFormChange = ({ name, type, value }) => {
    if (this.props.onFormChange) {
      this.props.onFormChange({ name, type, value })
    }
  }

  onRegister = async (name, type, value) => {
    await this.registerUpdate(name, type, value)
    this.setState({ initialData: this.state.fields })
  }

  onKeyUp = debounce((e) => {
    const { name, value } = e.target
    if (this.state.fields[name].touched) {
      this.doValidate(name, value)
    }
  }, 250)

  unRegister = (name) => {
    const { fields } = this.state
    delete fields[name]
    this.setState({ fields })
  }

  hasError = async () => {
    const { fields } = this.state
    const listFields = Object.keys(fields).filter(
      (name) => fields[name].validations.length
    )

    await Promise.all(
      listFields.map((name) => this.doValidate(name, fields[name].value))
    )

    return !listFields.every((name) => this.state.fields[name].error === false)
  }

  handleChange = (e) => {
    const { name, type } = e.target
    if (type === 'checkbox') {
      this.registerUpdate(name, 'value', e.target.checked)
      this.registerUpdate(name, 'checked', e.target.checked)
      return
    }
    this.registerUpdate(name, 'value', e.target.value)
  }

  handleBlur = (e) => {
    const { name, value } = e.target
    this.registerUpdate(name, 'active', false)
    this.registerUpdate(name, 'touched', true)
    this.doValidate(name, value)
  }

  handleKeyUp = (e) => {
    if (!this.props.keyUpValidation) return

    e.persist()
    this.onKeyUp(e)
  }

  handleFocus = (e) => {
    const { name } = e.target
    this.registerUpdate(name, 'active', true)
  }

  isValidField = (name, value) => {
    const { validations, required } = this.state.fields[name]
    const { fields } = this.state
    return validations.every(
      (func) => (value === '' && !required) || func(value, fields)
    )
  }

  doValidate = (name, value) => {
    const hasError = !this.isValidField(name, value)
    return Promise.all([
      this.registerUpdate(name, 'error', hasError),
      this.registerUpdate(name, 'touched', true)
    ])
  }

  validateForm = debounce(() => {
    const listFields = Object.keys(this.state.fields).filter(
      (name) => this.state.fields[name].validations.length
    )

    const isValid = listFields.every((name) => {
      const { value } = this.state.fields[name]
      return this.isValidField(name, value)
    })

    this.setState({ isValid })
  }, 250)

  updateFieldValue = (name, value) => {
    this.registerUpdate(name, 'value', value).then(() => {
      this.doValidate(name, value)
    })
  }

  registerUpdate = (name, type, value) =>
    new Promise((resolve) => {
      this.setState(
        (prevState) => ({
          fields: {
            ...prevState.fields,
            [name]: {
              ...prevState.fields[name],
              [type]: value
            }
          }
        }),
        () => {
          this.onFormChange({ name, type, value })
          this.validateForm()
          resolve()
        }
      )
    })

  render() {
    return (
      <Provider
        value={{
          fields: this.state.fields,
          isValid: this.state.isValid,
          onRegister: this.onRegister,
          unRegister: this.unRegister,
          onChange: this.handleChange,
          onBlur: this.handleBlur,
          onKeyUp: this.handleKeyUp,
          onFocus: this.handleFocus
        }}
      >
        <form onSubmit={this.onSubmit} noValidate>
          {this.props.children}
        </form>
      </Provider>
    )
  }
}

export default Form
