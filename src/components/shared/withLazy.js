import React, {Suspense} from 'react'
import {Loading} from 'components/shared/Elements'

export default Component => (props, {fallback}={}) => (
  <Suspense fallback={fallback || <Loading/>}>
    <Component {...props} />
  </Suspense>
)