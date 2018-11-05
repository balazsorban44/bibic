import React from 'react'
import moment from "moment"


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
      value={value ? moment(value).format("LL") : "Nincs megadva"}
    />
  </div>
)

export default Date