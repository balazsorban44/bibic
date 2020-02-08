import React from "react"
import "./content.sass"
import clsx from "clsx"
const Content = ({className, component: Component, ...props}) => {
  return (
    <Component
      className={clsx({"card-content": true}, className)}
      {...props}
    />
  )
}

Content.defaultProps = {component: "div"}


export default Content