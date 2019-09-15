import React from "react"
import "./page.sass"
import Text from "components/Text"
import Fade from "react-reveal/Fade"

const Page = ({component: Component = "section", children, title, titleProps, ...props}) =>
  <Component {...props}>
    <Fade>
      <Text
        {...titleProps}
        variant="h2"
      >
        {title}
      </Text>
    </Fade>
    {children}
  </Component>

export default Page