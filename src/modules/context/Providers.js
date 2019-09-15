import React from "react"
import {BrowserRouter} from "react-router-dom"
import {I18nextProvider} from "react-i18next"
import i18n from "lib/i18n"

const Providers = ({children}) =>
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  </BrowserRouter>

export default Providers