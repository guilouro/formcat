import React from 'react'
import PropTypes from 'prop-types'

const Wrapper = ({ label, required, children, error, reverse, className }) => {
  const clone = React.cloneElement(children, {
    ...(!!label && { id: label }),
    className: `${className} ${error ? 'formcat-error' : ''}`.trim()
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
  error: PropTypes.bool,
  className: PropTypes.string
}

Wrapper.defaultProps = {
  label: '',
  className: '',
  required: false,
  error: false,
  reverse: false
}

export default Wrapper
