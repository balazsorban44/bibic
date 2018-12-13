import React from 'react'
import {format} from 'date-fns'
import {hu} from 'date-fns/locale'


const Date = ({
  notification, name, label, value, hasFootnote
}) => (
  <div
    className="input-box"
    onClick={() => notification("useCalendarAsInput")}
  >
    <label
      className={hasFootnote ? "footnote-asterix" : ""}
    >
      {label}
    </label>
    <input
      id={name}
      readOnly
      {...{name}}
      value={value ? format(value, "YYYY. MMMM d.", {locale: hu, awareOfUnicodeTokens: true}) : "Nincs megadva"}
    />
  </div>
)

export default Date