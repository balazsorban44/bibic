import React from "react"
import "./section.sass"
import Text from "ui/Text"
import Fade from "react-reveal/Fade"
import clsx from "clsx"


const Section = ({
  bg,
  main,
  className,
  component: Component,
  children,
  title,
  titleProps,
  fade,
  ...props
}) => {
  Component = main ? "main" : Component
  const FadeComponent = fade ? Fade : React.Fragment
  return (
    <Component
      className={clsx({
        "section": true,
        "section-main": main,
        "section-noise": bg === "noisy"
      }, className)}
      {...props}
    >
      <FadeComponent>
        {typeof title === "string" ?
          <Text align="center" component="h2" {...titleProps}>
            {title}
          </Text> :
          title
        }
      </FadeComponent>
      {children}
    </Component>
  )
}


Section.defaultProps = {
  main: false,
  component: "section"
}

export default Section