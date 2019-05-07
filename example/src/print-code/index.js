import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Prism from 'prismjs'
import * as S from './styles'

const PrintCode = ({ children }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <S.Container>
      <pre>
        <code className="language-javascript">{children}</code>
      </pre>
    </S.Container>
  )
}

PrintCode.propTypes = {
  children: PropTypes.node.isRequired
}

export default PrintCode
