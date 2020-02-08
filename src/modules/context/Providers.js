import React from "react"
import {BrowserRouter} from "react-router-dom"
import {I18nextProvider} from "react-i18next"
import i18n from "lib/i18n"
import {ReservationProvider} from "./reservation"

const Providers = ({children}) =>
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <ReservationProvider>
        {children}
      </ReservationProvider>
    </I18nextProvider>
  </BrowserRouter>

export const withProviders = Component => props =>
  <Providers>
    <Component {...props}/>
  </Providers>

export default Providers

