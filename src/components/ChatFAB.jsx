import React from 'react'
import chat from '../assets/icons/chat.svg'
import Fade from "react-reveal/Fade"
import {useTranslation} from 'react-i18next'

export const ChatFAB = () => {
  const [t] = useTranslation()
  return (
    <Fade up>
      <div className="chat-fab">
        <span className="tooltip">{t("chat-fab")}</span>
        <a
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
        </a>
      </div>
    </Fade>
  )
}


export default ChatFAB