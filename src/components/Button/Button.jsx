import React from "react"
import clsx from "clsx"

import "./button.sass"


const Button = ({
  circle,
  color="default",
  fullWidth=false,
  size="medium",
  style={},
  component: Component="button",
  ...props
}, ref) =>
  <Component
    ref={ref}
    {...props}
    className={clsx({
      "btn": true,
      [`btn-color-${color}`]: color,
      [`btn-size-${size}`]: size !== "medium",
      "btn-full-width": fullWidth,
      ...props.className
    })}
  />

export default React.forwardRef(Button)