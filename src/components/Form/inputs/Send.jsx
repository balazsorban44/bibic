import React, {memo} from "react"

const Send = memo(props =>
  <button
    className="submit"
    type="submit"
    {...props}
  />
)

export default Send