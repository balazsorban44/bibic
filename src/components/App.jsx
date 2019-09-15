import React, {lazy} from "react"
import {Route, Switch} from "react-router-dom"
import {useTranslation} from "react-i18next"
import Loadable from "react-loadable"

import routes from "utils/routes"

import Landing from "modules/Landing"
import Introduction from "modules/Introduction"
import Providers from "modules/context"

import {ChatFAB} from "components/Pinned"
import BackButton from "components/BackButton"
import NotFound from "components/NotFound"
import Loading from "components/Loading"
import withLazy from "components/withLazy"


/**
 * NOTE: Asynchronously fetching Components
 * that do not need to be loaded at startup
 */

const Reservation = Loadable({
  loader: () => import("modules/reservation"),
  loading: Loading
})
const MessageForm = Loadable({
  loader: () => import("modules/Message"),
  loading: Loading
})
const FeedbackForm = Loadable({
  loader: () => import("modules/FeedbackForm"),
  loading: Loading
})

const ServicesPage = Loadable({
  loader: () => import("modules/Services/ServicesPage"),
  loading: Loading
})

const Carousel = Loadable({
  loader: () => import("components/Carousel"),
  loading: Loading
})

const Main = withLazy(lazy(() => import("components/Main")))

function App () {
  const [t] = useTranslation("common")
  return (
    <Providers>
      {/* <BetaWarning/> */}
      <Route render={({location: {pathname}}) => pathname !== routes.HOME && <BackButton/>} />
      <Switch>
        <Route
          exact
          path={routes.HOME}
          render={() =>
            <>
              <Landing/>
              <Introduction/>
              <ChatFAB/>
              <Main/>
            </>
          }
        />
        <Route
          component={() =>
            <Carousel
              itemClassName="food"
              subtitle={t("subtitles.foods")}
              title={t("titles.foods")}
              type="etelek"
            />
          }
          exact
          path={routes.FOODS}
        />
        <Route
          component={() =>
            <Carousel
              itemClassName="event"
              title={t("titles.events")}
              type="rendezvenyek"
            />}
          exact
          path={routes.EVENTS}
        />
        <Route
          component={MessageForm}
          path={routes.MESSAGE}
        />
        <Route
          component={Reservation}
          exact
          path={routes.RESERVE}
        />
        <Route
          component={FeedbackForm}
          path={routes.FEEDBACK_FORM}
        />
        <Route
          component={ServicesPage}
          path={routes.SERVICES}
        />
        <Route component={NotFound}/>
      </Switch>
    </Providers>
  )
}

export default App