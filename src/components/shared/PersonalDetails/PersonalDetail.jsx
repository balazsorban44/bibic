import React, {useState, memo} from "react"

export default memo(({
  error,
  errorMessage, // TODO: Notify
  label,
  name,
  type,
  placeholder,
  required,
  disabled,
  onChange,
  value
}) => {

  const [localValue, setLocalValue] = useState(value)

  const handleChange = ({target: {value}}) => setLocalValue(value)
  
  const handleBlur = () => onChange({[name]: localValue})

  
  return (
    <div className={`input-box personal-detail ${error ? "input-error" : ""}`}>
      <label
        className={required ? "footnote-asterix" : ""}
        htmlFor={name}
      >{label}</label>
      <input
        {...{
          disabled
        }}
        name={type || name}
        value={localValue}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={label || placeholder}
      />
      {
        error ?
        <h6>{errorMessage}</h6> :
        null
      }
    </div>
  )
})