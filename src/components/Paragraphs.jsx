import React from "react"
import Fade from "react-reveal/Fade"

import Loading from "ui/Loading"
import useParagraph from "hooks/data/useParagraph"
import Text from "../ui/Text"


const Paragraphs = ({
  component: Component = "div",
  type,
  paragraphProps,
  ...props
}) => {

  const [paragraphs, loading] = useParagraph(type)

  return loading ?
    <Loading/> :
    <Component {...props}>
      {Object.values(paragraphs).map(Paragraph(paragraphProps))}
    </Component>
}

const Paragraph = props => ({text}, index) =>
  <Fade bottom key={index}>
    <Text variant="p" {...props}>
      {text}
    </Text>
  </Fade>

export default Paragraphs