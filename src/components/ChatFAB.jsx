import React from 'react'
import chat from '../assets/icons/chat.svg'
import {withStore} from './db'
import Fade from "react-reveal/Fade"

const ChatFAB = ({hero}) =>
  <Fade
    up
    when={hero.length}
  >
    <div className="chat-fab">
      <span className="tooltip">Megtalál minket a Messengeren is!</span>
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


export default withStore(ChatFAB)