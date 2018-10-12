import React from 'react'
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
import Carousel from './shared/Carousel'


import Message from './Message'
import {ToastContainer} from 'react-toastify'


const App = () =>
  <>
    <ToastContainer
      closeOnClick
      position="bottom-center"
      style={{
        position: "fixed",
        zIndex: 10001,
        bottom: 0
      }}
    />
    <ChatFAB/>
    <Switch>
      <Route
        exact
        path="/"
        render={Main}
      />
      <Route
        component={() =>
          <Carousel
            className="foods"
            itemClassName="food"
            title="Ételeink"
          />
        }
        exact
        path="/etelek"
      />
      <Route
        component={() =>
          <Carousel
            className="events"
            itemClassName="event"
            title="Korábbi rendezvények"
          />}
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
          <>
            <BackMenu/>
            <MoreServices/>
          </>
        }
        path="/szolgaltatasok"
      />
      <Route component={NotFound}/>
    </Switch>
  </>

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


const Main = () =>
  <>
    <Menu/>
    <Hero/>
    <Introduction/>
    <Sunflower/>
    <Services/>
    <Rooms/>
    <Prices/>
  </>


export default App
