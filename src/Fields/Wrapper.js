import React from 'react'
import PropTypes from 'prop-types'

const Wrapper = ({ label, required, children, error, reverse }) => {
  const clone = React.cloneElement(children, {
    id: label,
    className: error ? 'formcat-error' : ''
  })
  return (
    <div>
      {reverse && clone}
      <label htmlFor={label}>
        {label}
        {required && !reverse && label && ' *'}
      </label>
      {!reverse && clone}
    </div>
  )
}

Wrapper.propTypes = {
  required: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string,
  reverse: PropTypes.bool,
  error: PropTypes.bool
}

Wrapper.defaultProps = {
  label: '',
  required: false,
  error: false,
  reverse: false
}

export default Wrapper
