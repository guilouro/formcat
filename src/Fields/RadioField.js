import React from 'react'
import PropTypes from 'prop-types'
import withContextForm from '../withContextForm'
import Wrapper from './Wrapper'

const RadioField = ({ label, error, ...input }) => (
  <Wrapper label={label} error={error} {...input} reverse>
    <input {...input} type="radio" />
  </Wrapper>
)

RadioField.propTypes = {
  error: PropTypes.bool.isRequired,
  label: PropTypes.string
}

RadioField.defaultProps = {
  label: ''
}

export default withContextForm(React.memo(RadioField))
