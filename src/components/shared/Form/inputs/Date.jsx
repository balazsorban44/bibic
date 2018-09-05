import React from 'react'
import moment from "moment"


const Date = ({
  notification, name, label, value, hasFootnote
}) => (
  <div
    className="input-box"
    onClick={() => notification("Kérjük válasszon érkezési és távozási dátumot a naptáron!")}
  >
    <label
      className={hasFootnote ? "footnote-asterix" : ""}
      htmlFor={name}
    >
      {label}
    </label>
    <input
      readOnly
      {...{name}}
      value={moment(value).format("LL")}
    />
  </div>
)

export default Date