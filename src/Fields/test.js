import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { Form } from '..'
import { InputField, SelectField, Submit, TextField } from '.'

jest.mock('lodash/debounce', () =>
  jest.fn(fn => {
    fn.cancel = jest.fn()
    return fn
  })
)

const mockResponse = {
  data: [
    { first_name: 'Guilherme Louro' },
    { gender: 'Male' },
    { agree: true },
    { message: 'I hope that these tests have been passed' }
  ],
  error: false,
  field: {
    agree: { required: true, value: true },
    first_name: { required: false, value: 'Guilherme Louro' },
    gender: { required: false, value: 'Male' },
    message: {
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
        <InputField type="checkbox" label="I agree" name="agree" required />
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
