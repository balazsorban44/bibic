import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render} from 'react-dom'
import './main.css'
import "./lib/moment"
import 'react-toastify/dist/ReactToastify.css'
import Database from './components/db'
import App from './components/App'
import Map from './components/Map'

render(
  <BrowserRouter>
    <Database>
      <App/>
    </Database>
  </BrowserRouter>,
  document.querySelector('.app')
)

render(<Map/>, document.querySelector(".map"))