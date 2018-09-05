import React, {Fragment} from 'react'
import {Loading} from "../../Elements"

const Send = ({
  disabled, onClick, children
}) =>
  <Fragment>
    {disabled ?
      <div style={{padding: "24px 0 48px"}} >
        <Loading/>
      </div> :
      <button
        {...{onClick}}
        className={`submit-reservation ${disabled ? "active-reserving": ""}`}
        type="submit"
      >{children}
      </button>
    }
  </Fragment>

export default Send