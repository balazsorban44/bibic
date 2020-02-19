import React from 'react'
import {useTranslation} from 'react-i18next'

const Service = ({inputs, value, onChange}) => {

  const handleChange = () => {
    onChange({foodService: value})
  }

  const [t] = useTranslation()
  const label = t(`reservation.food.${value}`)
  return (
    <div className="service">
      <label htmlFor={value}>{label}</label>
      <input
        {...inputs.radio("foodService", {
          value,
          generateProps: (field) => ({
            checked: field.value === value
          })
        })}
        onChange={handleChange}
      />
    </div>

  )
}

export default Service