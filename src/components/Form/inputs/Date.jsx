import React from 'react'

import {useTranslation} from 'react-i18next'
import {useNotification} from 'lib/notification'


const DateInput = ({name, value, hasFootnote, error}) => {
  const [t] = useTranslation()
  const label = t(`reservation.${name}.label`)

  value = value ? t("date", {date: {
    value,
    format: "yyyy. MMMM d."
  }}) : t("reservation.not-provided")

  const notify = useNotification()

  const handleClick = () => notify({type: "warn", content: "use-the-calendar"})

  return (
    <div className="input-box" onClick={handleClick} >
      <label className={`${hasFootnote ? "footnote-asterix" : ""} ${error ? "input-error" : ""}`} >
        {label}
      </label>
      <input
        disabled
        id={name}
        name={name}
        readOnly
        value={value}
      />
    </div>
  )
}

export default DateInput