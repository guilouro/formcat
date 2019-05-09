import { createContext } from 'react'

const FormContext = createContext({
  fields: {},
  isValid: true,
  onRegister: undefined,
  onChange: undefined,
  onKeyUp: undefined,
  onBlur: undefined,
  onFocus: undefined
})

export const { Provider, Consumer } = FormContext
