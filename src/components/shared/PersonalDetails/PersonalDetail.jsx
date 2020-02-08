import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'


const PersonalDetail = props => {
  const [t] = useTranslation()

  const {name, required=true, local=true, error, onChange, value: val, ...inputProps} = props
  const label = t(`form.${name}`)

  const [_value, setValue] = useState(val)

  const onBlur = () => {
    onChange({[name]: _value})
  }

  const handleBlur = local ? onBlur : undefined
  const handleChange = local ? (e) => setValue(e.target.value) : onChange
  const value = local ? _value : val

  return (
    <div className={`input-box personal-detail ${error ? "input-error" : ""}`}>
      <label
        className={required ? "footnote-asterix" : ""}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={label}
        value={value}
        {...inputProps}
      />
    </div>
  )
}


export default PersonalDetail