import React, {Component, Fragment} from 'react'
import {Route} from 'react-router-dom'
import Reservation from './Reservation'
import Main from './Main'
import Menu from './Menu'
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Menu/>
        <Main/>
        <Route path="/foglalas" component={Reservation}/>
      </Fragment>
    )
  }
}

