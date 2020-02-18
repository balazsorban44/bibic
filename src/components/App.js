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
import Carousel from "./shared/Carousel"
import Facilities from "./Facilities"
import {useTranslation} from 'react-i18next'

const Main = lazy(() => import("./Main"))


const App = () => {
  const [t] = useTranslation()
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
          component={() =>
            <Carousel
              className="foods"
              itemClassName="food"
              subtitle={t("foods.subtitle")}
              title={t("foods.title")}
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
              title={t("events.title")}
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


const ErrorPage = ({location}) => {
  //TODO: Whenever this page is rendered,
  // send logs to server if insightful,
  // PS: Check for sensitive information first

  console.log(location)

  const [t] = useTranslation()
  const {error} = location.state
  const title = t(`error.${error?.code ?? "generic"}.title`)
  const body = error?.message
  return (
    <main style={{
      minHeight: "calc(100vh - 8em - 228px)",
      padding: "4em"
    }}
    >
      <h1>
        {title}
      </h1>
      <p>
        {body}
      </p>
    </main>
  )
}


export default App
