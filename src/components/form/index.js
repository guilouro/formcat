import React from 'react';
import Form from './Form';
import withContextForm from './withContextForm';

const Input = props => {
  const { label, error, ...input } = props;
  return (
    <>
      <label>{label}</label>
      <input {...input} />
      <div>Error: {String(error)}</div>
    </>
  );
};

const Select = ({ error, options, ...input }) => (
  <select {...input}>
    {options.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const Textarea = ({ error, ...input }) => <textarea {...input} />;

const Checkbox = ({ label, error, ...input }) => {
  const id = `${input.name}-${input.value}`;
  return (
    <label htmlFor={id}>
      {label}
      <input {...input} type="checkbox" id={id} />
    </label>
  );
};

const InputField = withContextForm(React.memo(Input));
const SelectField = withContextForm(React.memo(Select));
const TextareaField = withContextForm(React.memo(Textarea));
const CheckboxField = withContextForm(React.memo(Checkbox));

export { Form, InputField, SelectField, TextareaField, CheckboxField };
