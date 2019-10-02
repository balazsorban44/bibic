import React from "react"
import "./section.sass"
import Text from "ui/Text"
import Fade from "react-reveal/Fade"
import clsx from "clsx"


const Section = ({bg, className, component: Component = "section", children, title, titleProps, ...props}) =>
  <Component
    className={clsx(
      "section",
      {"section-noise": bg === "noisy"},
      className
    )}
    {...props}
  >
    <Fade>
      {typeof title === "string" ?
        <Text align="center" variant="h2" {...titleProps}>
          {title}
        </Text> :
        title
      }
    </Fade>
    {children}
  </Component>

export default Section