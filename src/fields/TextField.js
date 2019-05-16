import React from 'react'
import PropTypes from 'prop-types'
import withContextForm from '../withContextForm'
import Wrapper from './Wrapper'

const TextField = ({ label, error, ...input }) => (
  <Wrapper label={label} error={error} {...input}>
    <textarea {...input} />
  </Wrapper>
)

TextField.propTypes = {
  error: PropTypes.bool.isRequired,
  label: PropTypes.string
}

TextField.defaultProps = {
  label: ''
}

export default withContextForm(React.memo(TextField))
