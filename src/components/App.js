import React, {Component, Fragment} from 'react'
import {Route} from 'react-router-dom'
import Reservation from './Reservation'
import Main from './Main'
import Menu from './Menu'
import chat from '../assets/icons/chat.svg'



export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" render={
          () => 
            <Fragment>
              <Menu/>
              <Main/>
              <ChatFAB/>
            </Fragment>
        }/>
        <Route path="/foglalas" component={Reservation}/>
      </Fragment>
    )
  }
}

const ChatFAB = () =>
  <div className="chat-fab">
    <span className="tooltip">Megtalál minket a Messengeren is!</span>
    <a
      href="https://www.messenger.com/t/200199203718517" 
      rel="noopener noreferrer"
      target="_blank">
      <img className="filled" src={chat} alt="" aria-hidden/>
    </a>
  </div>