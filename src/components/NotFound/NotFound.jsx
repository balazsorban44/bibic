import React from "react"
import {Link} from "react-router-dom"
import {useTranslation} from "react-i18next"

import "./not-found.sass"

function NotFound() {
  const [t] = useTranslation()
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>{t("404")}</p>
      <Link to ="/">{t("back-to")} {t("homepage")}</Link>
    </div>
  )
}


export default NotFound