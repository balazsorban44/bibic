import React from "react"
import {useHistory, useLocation, Link} from "react-router-dom"
import {useTranslation} from "react-i18next"
import Button from "ui/Button"
import Icon from "ui/Icon"
import arrow_thick from "assets/icons/arrow_thick.svg"

const BackButton = props => {
  const {goBack} = useHistory()
  const {search} = useLocation()

  const notToHome = new URLSearchParams(search).get("vissza")

  const [t] = useTranslation("common")
  return (
    <Button
      {...(notToHome
        ? {onClick: goBack}
        : {
          component: Link,
          to: "/"
        }
        )}
      leftIcon={
        <Icon
          src={arrow_thick}
          style={{transform: "rotate(180deg)"}}
        />
      }
      {...props}
    >
      {t("back-to")}: {t(notToHome || "homepage")}
    </Button>
  )
}

export default BackButton