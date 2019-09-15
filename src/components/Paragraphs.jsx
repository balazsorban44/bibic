import React from "react"
import Fade from "react-reveal/Fade"

import Loading from "components/Loading"
import useParagraph from "hooks/data/useParagraph"


const Paragraphs = ({
  component: Component = "div",
  type,
  ...props
}) => {

  const [paragraphs, loading] = useParagraph(type)

  return loading ?
    <Loading/> :
    <Component {...props}>
      {Object.values(paragraphs).map(Paragraph)}
    </Component>
}

const Paragraph = ({text}, index) =>
  <Fade bottom key={index}>
    <p>{text}</p>
  </Fade>

export default Paragraphs