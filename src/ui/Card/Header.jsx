import React from "react"
import Text from "ui/Text"
import clsx from "clsx"
import "./header.sass"
const Header = ({
  className,
  component: Component,
  title,
  subtitle,
  ...props
}) => {

  return (
    <Component
      className={clsx({"card-header": true}, className)}
      {...props}
    >
      <Text component="h3">{title}</Text>
      {subtitle
        ? <Text component="span">{subtitle}</Text>
        : null
      }
    </Component>
  )
}

Header.defaultProps = {component: "div"}


export default Header