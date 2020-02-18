import React, {lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'

import {BackMenu} from './Menu'
import ChatFAB from './ChatFAB'
import {routes} from '../utils/env'
import Top from "./Top"
import NotFound from "./NotFound"
import {Loading} from './shared/Elements'
import Footer from './Footer'


/**
 * NOTE: Asynchronously fetching Components
 * that do not need to be loaded at startup
 */

import ReservationForm from "./ReservationForm"
import FeedbackForm from "./FeedbackForm"
import MessageForm from "./MessageForm"
import Facilities from "./Facilities"
import Foods from './Foods'
import ErrorPage from './Error'
import Events from './Events'

const Main = lazy(() => import("./Main"))


const App = () => {
  return (
    <>
      <Route render={({location: {pathname}}) => pathname !== routes.HOME && <BackMenu/>} />
      <Switch>
        <Route
          exact
          path={routes.HOME}
          render={() =>
            <>
              <Top/>
              <ChatFAB/>
              <Suspense fallback={<Loading/>}>
                <Main/>
              </Suspense>
            </>
          }
        />
        <Route
          component={Foods}
          exact
          path={routes.FOODS}
        />
        <Route
          component={Events}
          exact
          path={routes.EVENTS}
        />
        <Route
          component={ReservationForm}
          exact
          path={routes.RESERVE}
        />
        <Route
          component={MessageForm}
          path={routes.MESSAGE}
        />
        <Route
          component={FeedbackForm}
          path={routes.FEEDBACK_FORM}
        />
        <Route
          component={Facilities}
          path={routes.FACILITIES}
        />
        <Route
          component={ErrorPage}
          path={routes.ERROR}
        />
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </>
  )
}


export default App
