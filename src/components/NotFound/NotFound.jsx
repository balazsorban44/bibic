import React from "react"
import {useTranslation} from "react-i18next"

import "./not-found.sass"
import Section from "ui/Section"
import Text from "ui/Text"
import BackButton from "components/BackButton"
import logo from "assets/icons/bibic.png"

function NotFound() {
  const [t] = useTranslation()
  return (
    <Section fade={false} className="not-found">
      <div>
        <Text component="h2">404</Text>
        <Text>{t("404")}</Text>
        <BackButton size="large"/>
      </div>
      <img
        className="not-found-img"
        src={logo}
      />
    </Section>
  )
}


export default NotFound