import React, { useRef, useState } from 'react'
import logo from '../../../logo.jpg'
import * as S from './styles'
import faker from 'faker'
import { Form, Submit } from '../../../src'
import {
  InputField,
  TextField,
  SelectField,
  RadiosField,
  CheckboxField
} from '../../../src/Fields'
import PrintCode from '../print-code'

export default function Main() {
  const [submitData, setSubmitData] = useState('')
  const form = useRef(null)

  const onSubmit = ({ data }) => {
    setSubmitData(JSON.stringify(data, undefined, 2))
  }

  const onPopulate = e => {
    e.preventDefault()
    form.current.updateFieldValue('first_name', faker.name.firstName())
    form.current.updateFieldValue('last_name', faker.name.lastName())
    form.current.updateFieldValue('email', faker.internet.email())
    form.current.updateFieldValue('password', faker.internet.password())
    form.current.updateFieldValue('occupation', 'fullstack')
    form.current.updateFieldValue('about', faker.lorem.paragraph(1))
    form.current.updateFieldValue('time_as_developer', '3-5')
  }

  return (
    <S.Container>
      <S.Logo src={logo} alt="Formcat" />

      <h1>Example of full form with populate fields</h1>

      <S.Grid>
        <PrintCode>
          {`
import { Form, Submit } from 'formcat'
import {
  InputField,
  TextField,
  SelectField,
  RadiosField,
  CheckboxField
} from 'formcat/Fields'

...
return (
  <Form keyUpValidation onSubmit={onSubmit}>
    <InputField label="First Name" name="first_name" required />
    <InputField label="Last Name" name="last_name" required />
    <InputField label="Email" name="email" required />
    <InputField
      type="password"
      label="password"
      name="password"
      required
    />
    <SelectField
      label="Choose your occupation"
      name="occupation"
      required
      options={[
        { label: '---', value: '' },
        { label: 'Frontend Developer', value: 'frontend' },
        { label: 'Backend Developer', value: 'backend' },
        { label: 'Fullstack Developer', value: 'fullstack' },
        { label: 'Other', value: 'other' }
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
    <TextField label="Say something about you" name="about" />
    <CheckboxField
      label="I'm agree to send my informations"
      name="agree"
      defaultChecked
    />
    <Submit>Send</Submit>
  </Form>
)
...
  `}
        </PrintCode>

        <S.FormContainer>
          <Form keyUpValidation onSubmit={onSubmit} ref={form}>
            <S.Field>
              <InputField label="First Name" name="first_name" required />
            </S.Field>

            <S.Field>
              <InputField label="Last Name" name="last_name" required />
            </S.Field>

            <S.Field>
              <InputField label="Email" name="email" required />
            </S.Field>

            <S.Field>
              <InputField
                label="Password"
                name="password"
                type="password"
                required
              />
            </S.Field>

            <S.Field>
              <SelectField
                label="Choose your occupation"
                name="occupation"
                required
                options={[
                  { label: '---', value: '' },
                  { label: 'Frontend Developer', value: 'frontend' },
                  { label: 'Backend Developer', value: 'backend' },
                  { label: 'Fullstack Developer', value: 'fullstack' },
                  { label: 'Other', value: 'other' }
                ]}
              />
            </S.Field>

            <S.Field>
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
            </S.Field>

            <S.Field>
              <TextField
                label="Say something about you"
                name="about"
                rows="10"
              />
            </S.Field>

            <CheckboxField
              label="I'm agree to send my informations"
              name="agree"
              required
            />

            <S.Buttons>
              <S.Populate onClick={onPopulate}>Populate Fields</S.Populate>
              <Submit>Send</Submit>
            </S.Buttons>
          </Form>

          <S.Code>
            <p>Submit data:</p>
            {submitData}
          </S.Code>
        </S.FormContainer>
      </S.Grid>
    </S.Container>
  )
}
