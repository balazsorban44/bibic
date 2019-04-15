import React, {lazy, Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'

import {BackMenu} from './Menu'
import ChatFAB from './ChatFAB'
import {routes} from '../utils/constants'
import Top from "./Top"
import NotFound from "./NotFound"
import {Loading} from './shared/Elements'


/**
 * NOTE: Asynchronously fetching Components
 * that do not need to be loaded at startup
 */

import ReservationForm from "./ReservationForm"
import FeedbackForm from "./FeedbackForm"
import MessageForm from "./MessageForm"
import Carousel from "./shared/Carousel"
import MoreServices from "./MoreServices"

const Main = lazy(() => import("./Main"))


const App = () =>
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
        component={() =>
          <Carousel
            className="foods"
            itemClassName="food"
            subtitle="Vendégházunkban éttermet nem üzemeltetünk, ezért az ételek kiválasztása előre szükséges, ételeket kizárólag szállóvendégeink részére készítünk, a falusi vendégasztal keretén belül."
            title="Ételeink"
          />
        }
        exact
        path={routes.FOODS}
      />
      <Route
        component={() =>
          <Carousel
            className="events"
            itemClassName="event"
            title="Rendezvények"
          />}
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
        component={MoreServices}
        path={routes.SERVICES}
      />
      <Route component={NotFound}/>
    </Switch>
  </>


export default App
