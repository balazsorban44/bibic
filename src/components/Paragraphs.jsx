import React from 'react'
import {Loading} from './Elements'
import Fade from "react-reveal/Fade"
import {useTranslation} from 'react-i18next'
import {useParagraph} from 'context/paragraph'

const Paragraphs = ({section}) => {
  const {i18n} = useTranslation()

  const {getParagraphs, loading} = useParagraph()

  if (loading) {
    return (<Loading/>)
  }

  const paragraphs = getParagraphs(section)

  return paragraphs.map(({key, input, translated}) =>
    <Fade bottom key={key}>
      <p>{translated[i18n.language] || input}</p>
    </Fade>
  )

}

export default Paragraphs