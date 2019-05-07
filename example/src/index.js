import React from 'react'
import { render } from 'react-dom'
import Main from './main'
import GlobalStyle from './global.styles'

const App = () => (
  <>
    <GlobalStyle />
    <Main />
  </>
)

render(<App />, document.getElementById('main'))
