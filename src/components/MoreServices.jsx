import React, {Component} from 'react'
import Gallery from './shared/Gallery'
import {ServiceItem} from './Services'


export default class MoreServices extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <section id="szolgaltatasok">
        <h2>Szolgáltatásaink</h2>
        <Gallery
          item={ServiceItem}
          path="szolgaltatasaink"
        />
      </section>
    )}
}