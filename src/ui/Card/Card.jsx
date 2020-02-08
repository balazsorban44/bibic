import React from "react"
import "./card.sass"
import clsx from "clsx"
const Card = ({color, className, component: Component, ...props}) => {
  return (
    <Component
      className={clsx(
        [ "card", `card-${color}`],
        className
      )}
      {...props}
    />
  )
}

Card.defaultProps = {
  component: "div",
  color: "color-1"
}


export default Card