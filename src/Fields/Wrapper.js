import React from 'react'
import PropTypes from 'prop-types'

const Wrapper = ({ label, required, children }) => (
  <div>
    <label htmlFor={label}>
      {label}
      {required && '*'}
    </label>
    {React.cloneElement(children, { id: label })}
  </div>
)

Wrapper.propTypes = {
  required: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string
}

Wrapper.defaultProps = {
  label: '',
  required: false
}

export default Wrapper
