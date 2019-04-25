import React from 'react'
import PeopleCount from "./PeopleCount"
import { useTranslation } from 'react-i18next';


const ageGroups = ["0-6", "6-12"]

export default ({values, max, name, onChange, required, label}) => {
  const [t] = useTranslation("reservation")

  const handleChange = ({children: value}) => {
    
    let v = [...values]
    if (v.length < value) {
      v.push("6-12")
      v = v.slice(0, max)
    }
    if (v.length > value) v.pop()
    
    onChange({children: v})
  }

  const handleSelect = ({target: {name: index, value}}) => {
    const v = [...values]
    v[index] = ageGroups.includes(value) ? value : "6-12"
    onChange({children: v})
  }

  

  const v = [...values].slice(0, max)
  
  
  return (
    <>
      <PeopleCount
        {...{
          required,
          name,
          label,
          max
        }}
        onChange={handleChange}
        placeholder={0}
        value={v.length}
      />
      <div className="children-age">
        {v.map((childAge, index) => {
          return (
            <div
              className="input-box child-age"
              key={index}
            >
              <label htmlFor={index}>{t("fields.selected-child", {number: index+1})}</label>
              <select
                name={index}
                onChange={handleSelect}
                value={childAge}
              >
                {
                  ageGroups.map(ageGroup =>
                    <option
                      key={ageGroup}
                      value={ageGroup}
                    >{t("fields.age-group", {ageGroup})}
                    </option>
                  )
                }
              </select>
            </div>
          )
        })}
      </div>
    </>
  )
}