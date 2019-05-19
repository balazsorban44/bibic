import React, {lazy} from 'react'
import {Route, Switch} from 'react-router-dom'
import routes from 'utils/routes'

import Menu, {BackButton} from './Menu'
import {ChatFAB, BetaWarning} from './Pinned'
import Introduction from './Introduction'
import Hero from './Hero'
import NotFound from "./NotFound"


/**
 * NOTE: Asynchronously fetching Components
 * that do not need to be loaded at startup
 */

import {useTranslation} from 'react-i18next'

import Loadable from 'react-loadable'
import withLazy from './shared/withLazy'
import {Loading} from './shared/Elements'

const ReservationForm = Loadable({
  loader: () => import("./forms/Reservation"),
  loading: Loading
})
const MessageForm = Loadable({
  loader: () => import("./forms/Message"),
  loading: Loading
})
const FeedbackForm = Loadable({
  loader: () => import("./forms/Feedback"),
  loading: Loading
})
const MoreServices = Loadable({
  loader: () => import("./MoreServices"),
  loading: Loading
})
const Carousel = Loadable({
  loader: () => import("components/shared/Carousel"),
  loading: Loading
})

const Main = withLazy(lazy(() => import("./Main")))

/**
 *
 */
export default function App () {
  const [t] = useTranslation("common")
  return (
    <>
      <BetaWarning/>
      <Route render={({location: {pathname}}) => pathname !== routes.HOME && <BackButton/>} />
      <Switch>
        <Route
          exact
          path={routes.HOME}
          render={() =>
            <>
              <Hero/>
              <Menu/>
              <Introduction/>
              <ChatFAB/>
              <Main/>
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
  )
}

