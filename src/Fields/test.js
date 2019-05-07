import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { Form } from '..'
import {
  InputField,
  SelectField,
  Submit,
  TextField,
  RadiosField,
  CheckboxField
} from '.'

jest.mock('lodash/debounce', () =>
  jest.fn(fn => {
    fn.cancel = jest.fn()
    return fn
  })
)

const mockResponse = {
  data: {
    first_name: 'Guilherme Louro',
    gender: 'Male',
    time_as_developer: '3-5',
    agree: true,
    message: 'I hope that these tests have been passed'
  },
  error: false,
  field: {
    agree: { checked: true, required: true, value: true },
    first_name: { checked: false, required: false, value: 'Guilherme Louro' },
    gender: { checked: false, required: false, value: 'Male' },
    time_as_developer: { checked: false, required: false, value: '3-5' },
    message: {
      checked: false,
      required: false,
      value: 'I hope that these tests have been passed'
    }
  }
}

describe('Fields', () => {
  it('Should submit correctly', done => {
    const onSubmit = jest.fn()
    const { container, getByText } = render(
      <Form onSubmit={onSubmit}>
        <InputField label="First Name" name="first_name" />
        <SelectField
          label="Gender"
          name="gender"
          options={[
            { label: 'Female', value: 'Female' },
            { label: 'Male', value: 'Male' }
          ]}
        />

        <RadiosField
          label="How many time do you work as developer?"
          name="time_as_developer"
          options={[
            { label: '1 - 3 years', value: '1-3' },
            { label: '3 - 5 years', value: '3-5' },
            { label: '+5 years', value: '+5' }
          ]}
        />

        <CheckboxField label="I agree" name="agree" required />

        <TextField label="Some message" name="message" />

        <Submit>Submit</Submit>
      </Form>
    )

    fireEvent.change(container.querySelector('input[name="first_name"]'), {
      target: { value: mockResponse.field.first_name.value }
    })

    fireEvent.change(container.querySelector('select'), {
      target: { value: mockResponse.field.gender.value }
    })

    fireEvent.click(
      container.querySelectorAll('input[name="time_as_developer"]')[1]
    )

    fireEvent.click(container.querySelector('input[name="agree"]'))

    fireEvent.change(container.querySelector('textarea'), {
      target: { value: mockResponse.field.message.value }
    })

    fireEvent.click(getByText(/Submit/g))

    setImmediate(() => {
      expect(onSubmit).toBeCalledWith(mockResponse)
      expect(container).toMatchSnapshot()
      done()
    })
  })
})
