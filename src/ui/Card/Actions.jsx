import React from "react"
import "./actions.sass"
import clsx from "clsx"
const Card = ({className, component: Component, ...props}) => {
  return (
    <Component
      className={clsx({"card-actions": true}, className)}
      {...props}
    />
  )
}

Card.defaultProps = {component: "div"}


export default Card