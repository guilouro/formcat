import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Form } from '..'
import {
  InputField,
  SelectField,
  Submit,
  TextField,
  RadiosField,
  CheckboxField
} from '.'

jest.mock('lodash.debounce', () =>
  jest.fn((fn) => {
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
    time_as_developer: { checked: false, required: true, value: '3-5' },
    message: {
      checked: false,
      required: false,
      value: 'I hope that these tests have been passed'
    }
  }
}

describe('Fields', () => {
  it('Should set class error if not valid', () => {
    const { container } = render(
      <Form>
        <InputField label="First Name" name="first_name" required />
      </Form>
    )

    const input = container.querySelector('input[name="first_name"]')
    fireEvent.change(input)
    fireEvent.blur(input)

    expect(input.getAttribute('class')).toBe('formcat-error')
  })

  it('Should not set id when label is empty', () => {
    const { container } = render(
      <Form>
        <InputField name="first_name" required />
      </Form>
    )

    expect(
      container.querySelector('input[name="first_name"]').hasAttribute('id')
    ).toBeFalsy()
  })

  it('Should submit correctly', (done) => {
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
          required
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
