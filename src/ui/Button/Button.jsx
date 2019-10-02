import React from "react"
import clsx from "clsx"

import "./button.sass"


const Button = ({circle, className, color, fullWidth, size, style, component: Component, ...props}) =>
  <Component
    {...props}
    className={clsx({
      "btn": true,
      [`btn-color-${color}`]: color,
      [`btn-size-${size}`]: size !== "medium",
      "btn-full-width": fullWidth,
      "btn-circle": circle
    }, className)}
  />

Button.defaultProps = {
  circle: false,
  color: "default",
  fullWidth: false,
  size: "medium",
  style: {},
  component: "button"
}

export default React.forwardRef((props, ref) => <Button ref={ref} {...props}/>)