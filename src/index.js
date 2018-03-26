import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import Hero from './components/Main/Hero'
import App from './components/App'
import Map from './components/Map'
import './main.css'

render( <Router>
          <App/>
        </Router>,
  document.querySelector('.app'))


render(<Hero/>, document.querySelector(".hero"))
render(<Map/>, document.querySelector(".map"))