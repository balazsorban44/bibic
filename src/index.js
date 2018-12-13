import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render} from 'react-dom'
import './sass/main.sass'
import 'react-toastify/dist/ReactToastify.css'
import Database from './components/db'
import App from './components/App'

render(
  <BrowserRouter>
    <Database>
      <App/>
    </Database>
  </BrowserRouter>,
  document.querySelector('.app')
)
