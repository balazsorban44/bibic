import React, {useState, memo} from "react"
import "./input.sass"
import clsx from "clsx"

const Input = ({
  component: Component="input",
  error,
  label,
  name,
  type,
  local = true,
  placeholder,
  id,
  required,
  checked,
  disabled,
  onChange,
  value,
  inputProps, // REVIEW: rename?
  className="",
  ...props
}) => {

  const [localValue, setLocalValue] = useState(value)

  const handleChange = e => local ? setLocalValue(e.target.value) : onChange(e)

  const handleBlur = e => {
    if (local) {
      const event = {...e}
      event.target.value = localValue
      onChange && onChange(event)
    }
  }

  return (
    <div
      {...props}
      className={clsx(
        "input-box",
        className,
        {"input-error": error}
      )}
    >
      <label
        className={clsx({"footnote-asterix": required})}
        htmlFor={id || name || type}
      >{label}
      </label>
      <Component
        checked={checked}
        disabled={disabled}
        id={id || name || type}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        value={onChange ? localValue : value}
        {...inputProps}
      />
    </div>
  )
}

export default memo(Input)