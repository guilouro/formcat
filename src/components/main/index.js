import React from 'react';
import { Form, InputField } from '../form';
import withContextForm from '../form/withContextForm';

const Input = withContextForm(({ error, ...props }) => <input {...props} />);

const Main = () => (
  <>
    <h1>Welcome</h1>

    <Form keyUpValidation>
      <Input name="asdasdasdas" />
    </Form>
  </>
);

export default Main;
