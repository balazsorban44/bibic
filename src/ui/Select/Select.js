import React, {memo} from "react"
import "./select.sass"

const Select = ({
  component: Component="select",
  error,
  label,
  name,
  required,
  disabled,
  onChange,
  value,
  selectProps, // REVIEW: rename?
  className="",
  children,
  fullWidth,
  ...props
}) => {

  return (
    <div {...props} className={`select-box ${className} ${error ? "select-error" : ""}`} style={{flex: Number(fullWidth)}}>
      {label ?
        <label
          className={required ? "footnote-asterix" : ""}
          htmlFor={name}
        >{label}
        </label>
        : null
      }
      <Component
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        {...selectProps}
      > {children} </Component>
    </div>
  )
}

export default memo(Select)