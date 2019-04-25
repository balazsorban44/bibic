import React, {memo} from 'react'
import {PeopleCount as Adults, Children} from 'components/shared/Form/inputs'
import { useTranslation } from 'react-i18next'


export default memo(({maxPeople, adults, children, onChange}) => {
  const [t] = useTranslation("reservation")
  return (
    <>
      <Adults
        label={t("fields.adults")}
        max={maxPeople - children.length}
        min={1}
        name="adults"
        onChange={onChange}
        placeholder={1}
        value={adults}
        />
      <Children
        required
        label={t("fields.children")}
        max={maxPeople - adults}
        name="children"
        onChange={onChange}
        values={children}
      />
    </>
  )
})