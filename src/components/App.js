import React from 'react'
import {
  Route, Link, Switch
} from 'react-router-dom'
import Menu, {BackMenu} from './Menu'
import chat from '../assets/icons/chat.svg'

import asyncComponent from "./AsyncComponent"
import Introduction from './Introduction'
import Hero from './Hero'

import {ToastContainer} from 'react-toastify'

// NOTE: Asynchronously fetching Components that do not need to load at startup
const ReservationForm = asyncComponent(() => import("./ReservationForm"))
const Sunflower = asyncComponent(() => import('./Sunflower'))
const Services = asyncComponent(() => import('./Services'))
const Prices = asyncComponent(() => import('./Prices'))
const Message = asyncComponent(() => import("./Message"))
const Rooms = asyncComponent(() => import("./Rooms"))
const Carousel = asyncComponent(() => import("./shared/Carousel"))
const MoreServices = asyncComponent(() => import("./MoreServices"))

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
