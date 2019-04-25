import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render} from 'react-dom'
import 'sass/main.sass'

import Database from 'db'
import App from 'components/App'
import {I18nextProvider} from 'react-i18next'
import i18n from 'lib/i18n'

render(
  <I18nextProvider i18n={i18n}>
    <BrowserRouter>
      <Database>
        <App/>
      </Database>
    </BrowserRouter>
  </I18nextProvider>,
  document.querySelector('.app')
)
