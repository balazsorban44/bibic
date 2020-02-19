import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
// For the slider elements
import {colors} from '../utils/colors'
import {useTranslation} from 'react-i18next'

export const Loading = ({fullPage, timeout = 10000}) => {

  const [timedOut, setTimedOut] = useState()

  useEffect(() => {
    const tick = () => setTimedOut(true)
    const timeoutId = setTimeout(tick, timeout)
    return () => clearTimeout(timeoutId)
  }, [timeout])

  const [t] = useTranslation()
  if (timedOut) {
    return (
      <p className="not-available">
        {t("content-unavailable")}
      </p>
    )
  }

  const style = fullPage ? {
    width: "100vw",
    height: "100vh",
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
    backgroundColor: colors.light
  } : undefined

  return (
    <div style={style}>
      <div className="loading"><div className="spinner"/></div>
    </div>
  )


}

export const Button = ({label, to}) => <Link {...{to}} >{label}</Link>