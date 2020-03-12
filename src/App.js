import React, {lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'

import {BackMenu} from 'pages/Main/Menu'
import ChatFAB from 'pages/Main/ChatFAB'
import {routes as ROUTES} from 'utils/env'
import Top from "pages/Main/Top"
import {Loading} from 'components/Elements'
import Footer from 'pages/Main/Footer'

import ReservationForm from "pages/ReservationForm"
import FeedbackForm from "pages/FeedbackForm"
import MessageForm from "pages/MessageForm"
import Facilities from "pages/Facilities"
import Foods from 'pages/Foods'
import ErrorPage from 'pages/Error'
import Events from 'pages/Events'
import NotFound from "pages/NotFound"

const Main = lazy(() => import("pages/Main"))

const Home = () =>
  <>
    <Top/>
    <ChatFAB/>
    <Suspense fallback={<Loading/>}>
      <Main/>
    </Suspense>
  </>

const routes = [
  {key: "Home", component: Home, path: ROUTES.HOME, exact: true},
  {key: "Foods", component: Foods, path: ROUTES.FOODS},
  {key: "Events", component: Events, path: ROUTES.EVENTS},
  {key: "ReservationForm", component: ReservationForm, path: ROUTES.RESERVE},
  {key: "MessageForm", component: MessageForm, path: ROUTES.MESSAGE},
  {key: "FeedbackForm", component: FeedbackForm, path: ROUTES.FEEDBACK_FORM},
  {key: "Facilities", component: Facilities, path: ROUTES.FACILITIES},
  {key: "ErrorPage", component: ErrorPage, path: ROUTES.ERROR},
  {key: "NotFound", component: NotFound}
]

const App = () =>
  <>
    <BackMenu/>
    <Switch>
      {routes.map(route => <Route {...route}/>)}
    </Switch>
    <Footer/>
  </>


export default App
