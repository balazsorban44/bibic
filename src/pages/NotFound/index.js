import React from 'react'
import {Link} from "react-router-dom"

import "./not-found.sass"
import {useTranslation} from 'react-i18next'

export default () => {
  const [t] = useTranslation()
  return (
    <div className="not-found">
      <h2>
        {404}
      </h2>
      <p>
        {t("not-found.paragraph")}
      </p>
      <Link to ="/">{t("not-found.back-to-homepage")}</Link>
    </div>
  )
}

