import React, { useRef } from 'react'
import {
  Form,
  InputField,
  SelectField,
  TextareaField,
  CheckboxField
} from '../../../src'

export default function Main() {
  const form = useRef(null)

  const setValue = () => {
    form.current.updateFieldValue('my-controlled-input', '@guilouro')
  }

  return (
    <>
      <h1>Welcome</h1>

      <Form keyUpValidation ref={form}>
        <InputField name="my-input" required />

        <InputField name="my-controlled-input" />

        <SelectField
          name="my-select"
          defaultValue={2}
          options={[
            { label: 'Item 1', value: 1 },
            { label: 'Item 2', value: 2 }
          ]}
        />

        <TextareaField name="my-textarea" />

        <CheckboxField name="my-check" label="I'm agree" defaultChecked />
      </Form>

      <button onClick={setValue}>Set @guilouro in input</button>
    </>
  )
}
