import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render} from 'react-dom'
import "lib/i18n"
import {NotificationProvider} from 'lib/notification'
import 'react-toastify/dist/ReactToastify.css'

import './sass/main.sass'
import Database from 'components/db'
import Database from './components/db'
import App from './components/App'

render(
  <BrowserRouter>
    <NotificationProvider>
    <Database>
      <App/>
    </Database>
    </NotificationProvider>
  </BrowserRouter>,
  document.querySelector('.app')
)
