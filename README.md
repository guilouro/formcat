<!--
/**
 * Getting start
 * > install with npm
 * > install with yarn
 *
 *
 * How to use
 * > Import Form
 * > create Field
 * > Using Submit
 * > Using validations
 * >
 *
 *
 * <Form>
 * keyUpValidation
 * onFormChange
 * onSubmit
 *
 *
 * <Fields>
 * defaultValue: '',
 * validations: [],
 *
 * Act with ref
 * updateFieldValue
 *
 */
 -->

# React Context Form

A simple and easy way to control forms with React Context API

## Getting Started

## Install

With npm

```
npm install --save react-context-form
```

With yarn

```
yarn add react-context-form
```

## How to use

First of all we need to create a Field using the [HOC](https://facebook.github.io/react/docs/higher-order-components.html) `withContextForm` as the example bellow:

```js
/* InputField.js */

import { withContextForm } from 'react-context-form';

const InputField = ({ error, ...input }) => (
  <input {...input} />
);

export default withContextForm(InputField);
```

Now we can use this component inside of Form:

```js
import { Form } from 'react-contex-form';
import InputField from './InputField';

function Main () {
  return (
    <Form>
      <InputField name="whatever" />
    </Form>
  )
}
```

# API

### Form

| Props | Type | Default value | Description |
| ----- | ---- | ------------- | ----------- |
| **keyUpValidation** | Boolean | `false` | When `true` the validations works on Fields `keyUp` |
| **onFormChange** | Function | `undefined` | A callback that return an object with `name`, `type` and `value`<br>of the each event's Form.  |
| **onSubmit** | Function | `undefined` | A callback that return an object with the form status and values.  |



*Obs: All *


### Field

It's a generic name for a component created by `withContextForm`.

| Props | Type | Default value | Description |
| ----- | ---- | ------------- | ----------- |
| **error** | Boolean | `false` | A flag that controll the field validation |
| **validations** | Array | `[]` | A list with all function validations of this field |
| **required** | Boolean | `false` | Set required validation for this field |
| **defaultValue** | String | `""` | Set initial text value |
| **defaultChecked** | String | `""` | Set initial checked for field |

## Using validations

We can use many validations per field using the props `validations`. All that we need to do is create a pure function that return `true` or `false` following the example bellow:

```js
import { Form, withFormContext } from 'react-context-form';

const Field = withFormContext(({ error, ...input }) => (
  <input {...input} />;
));


const Main = () => {

  // Validate if username is @guilouro
  const usernameValidation = value => (
    value === '@guilouro'
  )

  return (
    <Form>
      <Field
        name="username"
        validations={[usernameValidation]}
      />
    </Form>
  )
}
```

A validation function has two params `value` and `state`:

```js
function anyName (value, state) {}
```

| Param | Type | Description |
| ----- | ---- | ------------- |
| **value** | String  | Current field value |
| **state** | Object  | An object with all fields value |

### Set values

We can set values out of Form using `Ref` and `updateFieldValue` as example bellow:

```js
import { Form, withFormContext } from 'react-context-form';

const Field = withFormContext(({ error, ...input }) => {}(
  <input {...input} />;
));


const Main = () => {
  const form = useRef(null);

  const setValue = () => {
    form.current.updateFieldValue('username', '@guilouro');
  }

  return (
    <>
      <Form ref={ref}>
        <Field name="username" />
      </Form>

      <button onClick={setValue}>
        Set @guilouro as value
      </button>
    </>
  )
}

```

