import React from "react"
import "./text.sass"
import clsx from "clsx"

const Text = ({align, style, component: Component = "p", ...props}) =>
  <Component style={{textAlign: align, ...style}} {...props}/>

export default Text


export const Link = ({className, ...props}) =>
  <Text
    component="a"
    className={
      clsx(
        {
          "text-link": true
        },
        className
      )
    }
    {...props}
  />