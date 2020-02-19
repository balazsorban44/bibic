import React from 'react'
import {useTranslation} from 'react-i18next'


const Error = ({location}) => {
  //TODO: Whenever this page is rendered,
  // send logs to server if insightful,
  // PS: Check for sensitive information first

  const [t] = useTranslation()
  const {error} = location.state
  const title = t(`error.${error?.code ?? "generic"}.title`)
  const body = error?.message
  return (
    <main style={{
      minHeight: "calc(100vh - 8em - 228px)",
      padding: "4em"
    }}
    >
      <h1>
        {title}
      </h1>
      <p>
        {body}
      </p>
    </main>
  )
}


export default Error