import React from "react"
import {withRouter, Link} from "react-router-dom"
import {useTranslation} from "react-i18next"

const BackButton = withRouter(props => {
  const [t] = useTranslation("common")
  const {location: {search}, history: {goBack}} = props
  const customReturn = new URLSearchParams(search).get("vissza")
  const title = t(customReturn || "homepage")
  return(
    customReturn ?
      <button
        className="back-to-home"
        onClick={goBack}
        title={title}
      >
        <Title {...{title}}/>
      </button> :
      <Link
        className="back-to-home"
        title={title}
        to="/"
      >
        <Title {...{title}}/>
      </Link>
  )
})

const Title = ({title}) => {
  const [t] = useTranslation("common")
  return (
    <>
      ←
      <span>
        {t("back-to")} {t(title)}
      </span>
    </>
  )
}

export default BackButton