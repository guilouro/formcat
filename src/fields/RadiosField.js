import React, { useState } from 'react'
import PropTypes from 'prop-types'
import withContextForm from '../withContextForm'
import Wrapper from './Wrapper'

const RadiosField = ({ label, options, error, ...input }) => {
  const [checkedItem, setCheckedItem] = useState(
    (options.find(item => item.checked) || {}).value
  )

  const handleClick = value => {
    setCheckedItem(value)
  }

  return (
    <>
      {label && (
        <label>
          {label} {input.required && ' *'}
        </label>
      )}
      {options.map(item => (
        <Wrapper
          key={item.value}
          label={item.label}
          error={error}
          {...input}
          reverse
        >
          <input
            {...input}
            value={item.value}
            checked={item.value === checkedItem || item.value === input.value}
            onClick={() => handleClick(item.value)}
            type="radio"
          />
        </Wrapper>
      ))}
    </>
  )
}

RadiosField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      checked: PropTypes.bool
    })
  ),
  required: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  label: PropTypes.string
}

RadiosField.defaultProps = {
  label: '',
  required: false,
  options: []
}

export default withContextForm(React.memo(RadiosField))
