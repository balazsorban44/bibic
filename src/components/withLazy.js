import React, {Suspense} from "react"
import Loading from "ui/Loading"

const withLazy = Component => (props, {fallback}=null) => (
  <Suspense fallback={fallback || <Loading/>}>
    <Component {...props} />
  </Suspense>
)


export default withLazy