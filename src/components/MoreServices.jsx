import React, {Component} from 'react'
import {ServicesList} from './Services'


export default class MoreServices extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <section id="szolgaltatasok">
        <h2>Szolgáltatásaink</h2>
        <ServicesList/>
      </section>
    )}
}