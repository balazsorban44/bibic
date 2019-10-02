import React, {useRef, useEffect, useState} from "react"
// For the slider elements
import {useTranslation} from "react-i18next"
import colors from "ui/utils/colors"


export default function Loading({fullPage}) {
  const [t] = useTranslation("common")

  const [isTimedOut, setIsTimedOut] = useState(false)
  const timeout = useRef()

  useEffect(() => {
    timeout.current = setTimeout(() => setIsTimedOut(true), 10000)
    return clearInterval(timeout.current)
  }, [])


  const style = fullPage ? {
    width: "100vw",
    height: "100vh",
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
    backgroundColor: colors.light
  } : null

  return (
  // TODO: Add better empty state
    isTimedOut ?
      <p className="not-available">{t("not-available")}. </p> :
      <div style={style}><div className="loading"><div className="spinner"/></div></div>
  )
}
