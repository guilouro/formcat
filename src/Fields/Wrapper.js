import React from 'react'
import PropTypes from 'prop-types'

const Wrapper = ({ label, required, children, reverse }) => {
  const clone = React.cloneElement(children, { id: label })
  return (
    <div>
      {reverse && clone}
      <label htmlFor={label}>
        {label}
        {required && '*'}
      </label>
      {!reverse && clone}
    </div>
  )
}

Wrapper.propTypes = {
  required: PropTypes.bool,
  children: PropTypes.node,
  label: PropTypes.string,
  reverse: PropTypes.bool
}

Wrapper.defaultProps = {
  label: '',
  required: false,
  reverse: false
}

export default Wrapper
