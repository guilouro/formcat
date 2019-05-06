import React from 'react'
import PropTypes from 'prop-types'
import withContextForm from '../withContextForm'
import Wrapper from './Wrapper'

const CheckboxField = ({ label, error, ...input }) => (
  <Wrapper label={label} error={error} {...input} reverse>
    <input {...input} type="checkbox" />
  </Wrapper>
)

CheckboxField.propTypes = {
  error: PropTypes.bool.isRequired,
  label: PropTypes.string
}

CheckboxField.defaultProps = {
  label: ''
}

export default withContextForm(React.memo(CheckboxField))
