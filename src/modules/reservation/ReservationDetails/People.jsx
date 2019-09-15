import React from "react"
import {PeopleCount as Adults, Children} from "components/Form/inputs"
import {useTranslation} from "react-i18next"


const People = ({maxPeople, adults, children, onChange}) => {
  const [t] = useTranslation("reservation")

  return [
    <Adults
      key="0"
      label={t("fields.adults")}
      max={maxPeople - children.length}
      min={1}
      name="adults"
      onChange={onChange}
      placeholder={1}
      value={adults}
    />,
    <Children
      key="1"
      label={t("fields.children")}
      max={maxPeople - adults}
      name="children"
      onChange={onChange}
      required
      values={children}
    />
  ]
}

export default People