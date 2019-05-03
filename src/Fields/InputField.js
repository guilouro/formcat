import React from 'react'
import PropTypes from 'prop-types'
import withContextForm from '../withContextForm'
import Wrapper from './Wrapper'

const InputField = ({ label, error, ...input }) => (
  <Wrapper label={label} error={error} {...input}>
    <input {...input} />
  </Wrapper>
)

InputField.propTypes = {
  error: PropTypes.bool.isRequired,
  label: PropTypes.string
}

InputField.defaultProps = {
  label: ''
}

export default withContextForm(React.memo(InputField))
