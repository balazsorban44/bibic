import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import Hero from './components/Main/Hero'
import App from './components/App'
import Map from './components/Map'
import './main.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"



render(<App/>, document.querySelector('.app'))
render(<Hero/>, document.querySelector(".hero"))
render(<Map/>, document.querySelector(".map"))