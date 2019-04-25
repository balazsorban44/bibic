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

  const handleBlur = () => onChange({[name]: localValue})

  return (
    <div
      className={`input-box ${className} ${error ? "input-error" : ""}`}
      {...props}
    >
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
        name={type || name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={label || placeholder}
        value={localValue}
        {...inputProps}
      />
      {error ? <h6>{error}</h6> : null}
    </div>
  )
}

export default memo(Input)