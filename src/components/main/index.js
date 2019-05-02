import React from 'react';
import {
  Form,
  InputField,
  SelectField,
  TextareaField,
  CheckboxField,
} from '../form';

export default function Main() {
  return (
    <>
      <h1>Welcome</h1>

      <Form keyUpValidation>
        <InputField name="my-input" defaultValue="Guilherme Louro" />

        <SelectField
          name="my-select"
          defaultValue={2}
          options={[
            { label: 'Item 1', value: 1 },
            { label: 'Item 2', value: 2 },
          ]}
        />

        <TextareaField name="my-textarea" />

        <CheckboxField
          name="my-check"
          label="I'm agree"
          defaultChecked={true}
        />
      </Form>
    </>
  );
}
