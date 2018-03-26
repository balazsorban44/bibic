import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Reservation from './Reservation'
import Main from './Main'
import Menu from './Menu'
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Menu/>
        <Main/>
        <Route path="/foglalas" component={Reservation}/>
      </React.Fragment>
    )
  }
}

