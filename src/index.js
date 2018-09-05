import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {render} from 'react-dom'
import "./lib/moment"
import App from './components/App'
import Map from './components/Map'
import './main.css'
import Store from './components/db'


render(
  <Router>
    <Store>
      <App/>
    </Store>
  </Router>
  , document.querySelector('.app'))

render(<Map/>, document.querySelector(".map"))