import React, {Fragment} from 'react'
import {Loading} from "../../Elements"

const Send = ({
  isLoading, onClick, children
}) =>
  <Fragment>
    {isLoading ?
      <div style={{padding: "24px 0 48px"}} >
        <Loading/>
      </div> :
      <button
        {...{onClick}}
        className={`submit ${isLoading ? "submit-loading": ""}`}
        type="submit"
      >{children}
      </button>
    }
  </Fragment>

export default Send