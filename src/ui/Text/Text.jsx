import React from "react"
import "./text.sass"

const Text = ({align, style, variant: Component = "p", ...props}) =>
  <Component style={{textAlign: align, ...style}} {...props}/>

export default Text