import React from 'react';
import Form from './Form';
import withContextForm from './withContextForm';

const InputField = withContextForm(
  React.memo(props => {
    const { label, error, ...input } = props;
    return (
      <>
        <label>{label}</label>
        <input {...input} />
        <div>Error: {String(error)}</div>
      </>
    );
  })
);

export { Form, InputField };
