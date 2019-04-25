import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNotification } from 'hooks';


export default ({
  name, label, value, required, error
}) => {
  const [t] = useTranslation("reservation")
  const {notify} = useNotification()
  return (
    <div
      className={`input-box ${error ? "input-error" : ""}`}
      onClick={() => notify("use-calendar", {type: "warn"})}
    >
      <label
        className={required ? "footnote-asterix" : ""}
      >
        {label}
      </label>
      <input
        id={name}
        readOnly
        {...{name}}
        value={t("fields.date-label", {value})}
      />
    </div>
  )
}