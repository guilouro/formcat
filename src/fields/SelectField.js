import React from 'react'
import PropTypes from 'prop-types'
import withContextForm from '../withContextForm'
import Wrapper from './Wrapper'

const SelectField = ({ label, error, options, ...input }) => (
  <Wrapper label={label} error={error} {...input}>
    <select {...input}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  </Wrapper>
)

SelectField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  error: PropTypes.bool.isRequired,
  label: PropTypes.string
}

SelectField.defaultProps = {
  label: '',
  options: []
}

export default withContextForm(React.memo(SelectField))
