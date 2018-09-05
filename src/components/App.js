import React, {Component, Fragment} from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import ReservationForm from './ReservationForm'
import Introduction from './Introduction'
import Sunflower from './Sunflower'
import Hero from './Hero'
import Services from './Services'
import MoreServices from './MoreServices'
import Rooms from './Rooms'
import Prices from './Prices'
import Menu, {BackMenu} from './Menu'
import chat from '../assets/icons/chat.svg'
import Foods from './Foods'

import Slider from './shared/Slider'
import Message from './Message'


const App = () =>
  <Fragment>
    <ChatFAB/>
    <Switch>
      <Route
        exact
        path="/"
        render={Main}
      />
      <Route
        component={Foods}
        exact
        path="/etelek"
      />
      <Route
        component={Events}
        exact
        path="/rendezvenyek"
      />
      <Route
        component={ReservationForm}
        exact
        path="/foglalas"
      />
      <Route
        component={Message}
        path="/uzenet"
      />
      <Route
        component={() =>
          <Fragment>
            <BackMenu/>
            <MoreServices/>
          </Fragment>
        }
        path="/szolgaltatasok"
      />
      <Route component={NotFound}/>
    </Switch>
  </Fragment>

const ChatFAB = () =>
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
          databaseRef="events"
          sectionId="rendezvenyek"
          title="Rendezvények"
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
