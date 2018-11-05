import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Menu, {BackMenu} from './Menu'

import lazy from "./AsyncComponent"
import Introduction from './Introduction'
import Hero from './Hero'

import {ToastContainer} from 'react-toastify'
import ChatFAB from './ChatFAB'
import Feedbacks from './Feedbacks'
import FeedbackForm from './FeedbackForm'
import {FEEDBACK_FORM} from '../utils/constants'

// NOTE: Asynchronously fetching Components that do not need to load at startup
const ReservationForm = lazy(() => import("./ReservationForm"))
const Sunflower = lazy(() => import('./Sunflower'))
const Services = lazy(() => import('./Services'))
const Prices = lazy(() => import('./Prices'))
const MessageForm = lazy(() => import("./MessageForm"))
const Rooms = lazy(() => import("./Rooms"))
const Carousel = lazy(() => import("./shared/Carousel"))
const MoreServices = lazy(() => import("./MoreServices"))
const NotFound = lazy(() => import("./NotFound"))

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
    <Route render={({location: {pathname}}) => pathname !== '/' && <BackMenu/>} />
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
        component={MessageForm}
        path="/uzenet"
      />
      <Route
        component={FeedbackForm}
        path={FEEDBACK_FORM}
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


export const Main = () =>
  <>
    <Menu/>
    <Hero/>
    <Introduction/>
    <Sunflower/>
    <Services/>
    <Rooms/>
    <Prices/>
    <Feedbacks/>
  </>


export default App
