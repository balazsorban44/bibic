import React, {Component, Fragment} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import Reservation from './Reservation'
import Introduction from './Introduction'
import Sunflower from './Sunflower'
import Hero from './Hero'
import Services from './Services'
import Rooms from './Rooms'
import Prices from './Prices'
import Menu, {BackMenu} from './Menu'
import chat from '../assets/icons/chat.svg'
import Foods from './Foods'

import Slider from './shared/Slider'


const App = () => 
  <Fragment>
    <ChatFAB/>
    <Switch>
      <Route exact path="/" render={Main}/>
      <Route exact path="/etelek" component={Foods}/>
      <Route exact path="/rendezvenyek" component={Events}/>
      <Route exact path="/foglalas" component={Reservation}/>
      <Route component={NotFound}/>
    </Switch>
  </Fragment>

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



const NotFound = () => 
  <div className="not-found">
    <h2>
      404
    </h2>
    <p>
      Hmm... Ez az oldal sajnos üres.
    </p>
    <Link to ="/">Vissza a főoldalra</Link>
  </div>


class Events extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Fragment>
        <BackMenu/>
        <Slider
          title="Rendezvények"
          sectionId="rendezvenyek"
          databaseRef="events"
        />
      </Fragment>
    )
  }
}


const Main = () =>
  <Fragment>
    <Menu/>
    <Hero/>
    <Introduction/>
    <Sunflower/>
    <Services/>
    <Rooms/>
    <Prices/>
  </Fragment>


export default App
