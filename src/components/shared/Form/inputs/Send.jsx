import React, {memo} from 'react'

const Send = memo(({loading, onClick, children}) =>
  <button
    disabled={loading}
    onClick={onClick}
    className="submit"
    type="submit"
  >{children}
  </button>
)

export default Send