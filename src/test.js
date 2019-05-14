import React, { useRef } from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from 'react-testing-library'
import { Form, withContextForm, withSubmit } from '.'

jest.mock('lodash.debounce', () =>
  jest.fn(fn => {
    fn.cancel = jest.fn()
    return fn
  })
)

const SimpleField = withContextForm(({ error, ...input }) => (
  <>
    <input {...input} />
    {error && <span>Has error</span>}
  </>
))

const Submit = withSubmit(props => <button {...props} />)

describe('<Form />', () => {
  afterEach(cleanup)

  it('Should render correctly', () => {
    const { container } = render(
      <Form>
        <SimpleField name="Lorem" />
      </Form>
    )

    expect(container.querySelectorAll('input[name="Lorem"]')).toHaveLength(1)
    expect(container).toMatchSnapshot()
  })

  it('Should change value when write', () => {
    const { container } = render(
      <Form>
        <SimpleField name="Lorem" />
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'Some text' } })
    expect(input.value).toBe('Some text')
  })

  it('Should start with initial value', () => {
    const { container } = render(
      <Form>
        <SimpleField name="Lorem" defaultValue="Some text" />
      </Form>
    )

    expect(container.querySelector('input[name="Lorem"]').value).toBe(
      'Some text'
    )
  })

  it('Should start with initial checked', () => {
    const { container } = render(
      <Form>
        <SimpleField name="Lorem" type="checkbox" defaultChecked />
      </Form>
    )

    expect(container.querySelector('input[name="Lorem"]').value).toBe('true')
    expect(container.querySelector('input[name="Lorem"]').checked).toBe(true)
  })

  it('Should change checked', () => {
    const { container } = render(
      <Form>
        <SimpleField name="Lorem" type="checkbox" />
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')

    expect(input.value).toBe('')
    fireEvent.click(input)
    expect(input.checked).toBe(true)
  })

  it('Should set error when field is empty and required is true', () => {
    const { container, getByText, queryByText } = render(
      <Form>
        <SimpleField name="Lorem" required />
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')
    expect(input.required).toBeTruthy()

    expect(queryByText(/Has error/g)).toBeNull()
    fireEvent.blur(input)
    expect(getByText(/Has error/g)).toBeTruthy()
  })

  it('Should remove error when field is not empty and required is true', () => {
    const { container, getByText, queryByText } = render(
      <Form>
        <SimpleField name="Lorem" required />
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')
    fireEvent.blur(input)
    expect(getByText(/Has error/g)).toBeTruthy()

    fireEvent.change(input, { target: { value: 'any' } })
    fireEvent.blur(input)
    expect(queryByText(/Has error/g)).toBeNull()
  })

  it('Should set error when field does not match validation', () => {
    const validation = value => value === '@guilouro'

    const { container, getByText, queryByText } = render(
      <Form>
        <SimpleField name="Lorem" validations={[validation]} />
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')

    expect(queryByText(/Has error/g)).toBeNull()
    fireEvent.change(input, { target: { value: 'any' } })
    fireEvent.blur(input)
    expect(getByText(/Has error/g)).toBeTruthy()
  })

  it('Should remove error when have validation match', () => {
    const validation = value => value === '@guilouro'

    const { container, getByText, queryByText } = render(
      <Form>
        <SimpleField name="Lorem" validations={[validation]} />
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')

    fireEvent.change(input, { target: { value: 'any' } })
    fireEvent.blur(input)
    expect(getByText(/Has error/g)).toBeTruthy()

    fireEvent.change(input, { target: { value: '@guilouro' } })
    fireEvent.blur(input)
    expect(queryByText(/Has error/g)).toBeNull()
  })

  it('Should check validation with keyUp after touch field', () => {
    const validation = value => value === '@guilouro'

    const { container, getByText, queryByText } = render(
      <Form keyUpValidation>
        <SimpleField name="Lorem" validations={[validation]} />
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')
    fireEvent.blur(input) // touch field

    fireEvent.change(input, { target: { value: 'any' } })
    fireEvent.keyUp(input)
    expect(getByText(/Has error/g)).toBeTruthy()

    fireEvent.change(input, { target: { value: '@guilouro' } })
    fireEvent.keyUp(input)
    expect(queryByText(/Has error/g)).toBeNull()
  })

  it('Should not check validation with keyUp if field does not touched', () => {
    const validation = value => value === '@guilouro'

    const { container, queryByText } = render(
      <Form keyUpValidation>
        <SimpleField name="Lorem" validations={[validation]} />
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')

    fireEvent.change(input, { target: { value: 'any' } })
    fireEvent.keyUp(input)
    expect(queryByText(/Has error/g)).toBeNull()
  })

  it('Should call onChange', () => {
    const onChange = jest.fn()
    const { container } = render(
      <Form>
        <SimpleField name="Lorem" onChange={onChange} />
      </Form>
    )

    fireEvent.change(container.querySelector('input[name="Lorem"]'), {
      target: { value: 'any' }
    })

    expect(onChange).toBeCalled()
  })

  it('Should call onBlur', () => {
    const onBlur = jest.fn()
    const { container } = render(
      <Form>
        <SimpleField name="Lorem" onBlur={onBlur} />
      </Form>
    )

    fireEvent.blur(container.querySelector('input[name="Lorem"]'))

    expect(onBlur).toBeCalled()
  })

  it('Should call onFocus', () => {
    const onFocus = jest.fn()
    const { container } = render(
      <Form>
        <SimpleField name="Lorem" onFocus={onFocus} />
      </Form>
    )

    fireEvent.focus(container.querySelector('input[name="Lorem"]'))

    expect(onFocus).toBeCalled()
  })

  it('Should call onKeyUp', () => {
    const onKeyUp = jest.fn()
    const { container } = render(
      <Form>
        <SimpleField name="Lorem" onKeyUp={onKeyUp} />
      </Form>
    )

    fireEvent.keyUp(container.querySelector('input[name="Lorem"]'))

    expect(onKeyUp).toBeCalled()
  })

  it('Should call onSubmit', done => {
    const onSubmit = jest.fn()
    const { getByText } = render(
      <Form onSubmit={onSubmit}>
        <SimpleField name="Lorem" />
        <Submit>Submit</Submit>
      </Form>
    )

    fireEvent.click(getByText(/Submit/g))

    setImmediate(() => {
      expect(onSubmit).toBeCalled()
      done()
    })
  })

  it('Should reset Form after submit', async done => {
    const { container, getByText } = render(
      <Form clearAfterSubmit onSubmit={jest.fn()}>
        <SimpleField name="Lorem" />
        <Submit>Submit</Submit>
      </Form>
    )

    const input = await waitForElement(() => {
      return container.querySelector('input')
    })

    fireEvent.change(input, { target: { value: 'Lorem Ipsum' } })

    expect(input.value).toBe('Lorem Ipsum')
    fireEvent.click(getByText(/Submit/g))

    setImmediate(() => {
      expect(input.value).toBe('')
      done()
    })
  })

  it('Should disabled Submit when Form is not valid', () => {
    const { getByText } = render(
      <Form>
        <SimpleField name="Lorem" required />
        <Submit>Submit</Submit>
      </Form>
    )

    expect(getByText(/Submit/g).hasAttribute('disabled')).toBeTruthy()
  })

  it('Should disabled Submit if started with a invalid field', () => {
    const { getByText } = render(
      <Form>
        <SimpleField name="Lorem" required />
        <Submit>Submit</Submit>
      </Form>
    )

    expect(getByText(/Submit/g).hasAttribute('disabled')).toBeTruthy()
  })

  it('Should enabled Submit if started with a valid field', () => {
    const { container, getByText } = render(
      <Form>
        <SimpleField name="Lorem" required />
        <Submit>Submit</Submit>
      </Form>
    )

    fireEvent.change(container.querySelector('input[name="Lorem"'), {
      target: { value: 'any' }
    })

    expect(getByText(/Submit/g).hasAttribute('disabled')).toBeFalsy()
  })

  it('Should set value using updateFieldValue', () => {
    const WithRef = () => {
      const form = useRef(null)
      const handleClick = () => {
        form.current.updateFieldValue('Lorem', '@guilouro')
      }
      return (
        <>
          <Form ref={form}>
            <SimpleField name="Lorem" />
          </Form>
          <button onClick={handleClick}>Change</button>
        </>
      )
    }

    const { container, getByText } = render(<WithRef />)
    fireEvent.click(getByText(/Change/g))
    expect(container.querySelector('input[name="Lorem"]').value).toBe(
      '@guilouro'
    )
  })

  it('Should return field values with onSubmit', done => {
    const onSubmit = jest.fn()
    const { container, getByText } = render(
      <Form onSubmit={onSubmit}>
        <SimpleField name="Lorem" />
        <Submit>Submit</Submit>
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')
    fireEvent.change(input, { target: { value: 'any' } })
    fireEvent.blur(input)

    const expectData = {
      data: { Lorem: 'any' },
      error: false,
      field: {
        Lorem: {
          checked: false,
          active: false,
          error: false,
          required: false,
          touched: true,
          value: 'any'
        }
      }
    }

    fireEvent.click(getByText(/Submit/g))

    setImmediate(() => {
      expect(onSubmit).toBeCalledWith(expectData)
      done()
    })
  })

  it('Should return error when form is not valid', done => {
    const onSubmit = jest.fn()
    const { container, getByText } = render(
      <Form onSubmit={onSubmit}>
        <SimpleField name="Lorem" required />
        <button>Submit</button>
      </Form>
    )

    const input = container.querySelector('input[name="Lorem"]')
    fireEvent.focus(input)
    fireEvent.blur(input)

    const expectData = {
      data: { Lorem: '' },
      error: true,
      field: {
        Lorem: {
          checked: false,
          active: false,
          error: true,
          required: true,
          touched: true,
          value: ''
        }
      }
    }

    fireEvent.click(getByText(/Submit/g))

    setImmediate(() => {
      expect(onSubmit).toBeCalledWith(expectData)
      done()
    })
  })

  describe('onFormChange', () => {
    let onFormChange, input

    beforeEach(() => {
      onFormChange = jest.fn()
      const { container } = render(
        <Form onFormChange={onFormChange}>
          <SimpleField name="Lorem" />
        </Form>
      )

      input = container.querySelector('input[name="Lorem"]')
      onFormChange.mockRestore()
    })

    afterEach(() => {
      onFormChange.mockRestore()
    })

    it('Should called with onChange', () => {
      fireEvent.change(input, { target: { value: 'any' } })
      expect(onFormChange).toBeCalledWith({
        name: 'Lorem',
        type: 'value',
        value: 'any'
      })
    })

    it('Should called with onBlur', () => {
      fireEvent.blur(input)
      expect(onFormChange).toBeCalledWith({
        name: 'Lorem',
        type: 'touched',
        value: true
      })
      expect(onFormChange).toBeCalledWith({
        name: 'Lorem',
        type: 'active',
        value: false
      })
    })

    it('Should called with onFocus', () => {
      fireEvent.focus(input)
      expect(onFormChange).toBeCalledWith({
        name: 'Lorem',
        type: 'active',
        value: true
      })
    })

    it('Should called with onChange and type is checkbox', () => {
      const { container } = render(
        <Form onFormChange={onFormChange}>
          <SimpleField name="Lorem" type="checkbox" />
        </Form>
      )

      onFormChange.mockRestore()
      const input = container.querySelector('input[name="Lorem"]')

      fireEvent.click(input)
      expect(onFormChange).toBeCalledWith({
        name: 'Lorem',
        type: 'value',
        value: true
      })
      expect(onFormChange).toBeCalledWith({
        name: 'Lorem',
        type: 'checked',
        value: true
      })
    })
  })
})
