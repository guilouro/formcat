import styled from 'styled-components'

export const Logo = styled.img`
  width: 500px;
`

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Grid = styled.main`
  /* max-width: 1024px; */
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const FormContainer = styled.div`
  padding: 0 20%;
  label {
    width: 100%;
    font-size: 14px;
    margin-bottom: 5px;
  }
`

export const Code = styled.div``

export const Field = styled.article`
  margin-bottom: 15px;

  select {
    width: 100%;
    height: 25px;
  }

  input[type='radio'] {
    width: auto;
    margin: 5px 10px 5px 0;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    outline: none;
    border: 1px solid #ddd;

    &.formcat-error {
      border-color: red;
    }
  }

  textarea {
    display: block;
  }
`

export const Buttons = styled.div`
  margin: 10px 0;

  button {
    padding: 10px 20px;
    border-radius: 5px;
    outline: none;
    margin-right: 15px;
  }
`

export const Populate = styled.button`
  background-color: green;
  color: #fff;
`
