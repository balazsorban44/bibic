import React from 'react'
import {Loading} from "../../Elements"

const Send = ({
  isLoading, onClick, children
}) =>
  <>
    {isLoading ?
      <div style={{padding: "24px 0 48px"}} >
        <Loading/>
      </div> :
      <button
        {...{onClick}}
        className="submit"
        type="submit"
      >{children}
      </button>
    }
  </>

export default Send