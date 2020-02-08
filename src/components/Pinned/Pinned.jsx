import React from "react"
import chat from "assets/icons/chat.svg"
import Fade from "react-reveal/Fade"
import {useTranslation} from "react-i18next"
import Button from "ui/Button"
import "./pinned.sass"

export const ChatFAB = () => {
  const [t] = useTranslation("common")
  return (
    <Fade up>
      <div className="chat-fab">
        <span className="tooltip">{t("messenger-tooltip")}</span>
        <Button
          circle
          component="a"
          href="https://www.messenger.com/t/200199203718517"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt=""
            aria-hidden
            className="filled"
            src={chat}
          />
        </Button>
      </div>
    </Fade>


  )

}

const show =
  "location" in window &&
  ![
    "bibicvendeghazak.hu"
    // "localhost"
  ].includes(window.location.hostname)

export const BetaWarning = show ? () => {
  const [t] = useTranslation("common")

  return (
    <div className="beta-warning">
      <span className="tooltip">{t("beta-tooltip")}</span>
      <h5>{t("beta")}</h5>
    </div>
  )
} : () => null
