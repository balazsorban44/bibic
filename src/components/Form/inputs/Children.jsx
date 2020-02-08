import React from "react"
import PeopleCount from "./PeopleCount"
import {useTranslation} from "react-i18next"


const ageGroups = ["0-6", "6-12"]

export default ({values, max, name, onChange, label}) => {
  const [t] = useTranslation("reservation")

  const handleChange = ({children: value}) => {
    let newChildren = [...values]
    if (newChildren.length < value) {
      newChildren.push("6-12")
      newChildren = newChildren.slice(0, max)
    }

    if (newChildren.length > value) newChildren.pop()

    onChange({children: newChildren})
  }

  const handleSelect = ({target: {name: index, value}}) => {
    const newChildren = [...values]
    newChildren[index] = ageGroups.includes(value) ? value : "6-12"
    onChange({children: newChildren})
  }


  const v = [...values].slice(0, max)


  return (
    <>
      <PeopleCount
        {...{name, label, max}}
        onChange={handleChange}
        placeholder={0}
        required
        value={v.length}
      />
      <div className="children-age">
        {v.map((childAge, index) =>
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
        )}
      </div>
    </>
  )
}