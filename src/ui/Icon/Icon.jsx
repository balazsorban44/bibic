import React from "react"
import clsx from "clsx"

import "./icon.sass"


const Icon = ({
    className,
    ...props
}) =>
  <img
    {...props}
    className={clsx({
      icon: true,
    }, className)}
  />

Icon.defaultProps = {
    src: null,
    alt: "icon",
    width: 32,
    height: 32
}

export default React.forwardRef((props, ref) => <Icon ref={ref} {...props}/>)