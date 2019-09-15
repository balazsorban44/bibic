import React, {useState, memo} from "react"
import "./input.sass"

const Input = ({
  component: Component="input",
  error,
  label,
  name,
  type,
  placeholder,
  required,
  disabled,
  onChange,
  value,
  inputProps, // REVIEW: rename?
  className="",
  ...props
}) => {

  const [localValue, setLocalValue] = useState(value)

  const handleChange = ({target: {value}}) => setLocalValue(value)

  const handleBlur = e => {
    const event = {...e}
    event.target.value = localValue
    onChange(event)
  }

  return (
    <div {...props} className={`input-box ${className} ${error ? "input-error" : ""}`}>
      {label ?
        <label
          className={required ? "footnote-asterix" : ""}
          htmlFor={name || type}
        >{label}
        </label>
        : null
      }
      <Component
        disabled={disabled}
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        value={localValue}
        {...inputProps}
      />
    </div>
  )
}

export default memo(Input)