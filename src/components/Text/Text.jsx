import React from "react"
import "./text.sass"
import clsx from "clsx"

const Text = ({children, align, style, variant: Component = "p", className, ...props}) => {
  return (
    <Component
      className={clsx({typography: true})}
      style={{
        textAlign: align,
        ...style
      }}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Text