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

import {useTranslation} from 'react-i18next'
import FeedbackForm from "./FeedbackForm"
import MessageForm from "./MessageForm"
import Carousel from "./shared/Carousel"
import MoreServices from "./MoreServices"

const Main = lazy(() => import("./Main"))


const App = () =>
  <>
  const [t] = useTranslation("common")
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
              subtitle={t("subtitles.foods")}
              title={t("titles.foods")}
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
              title={t("titles.events")}
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
