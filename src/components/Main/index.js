import React, {Component} from 'react'

import Introduction from './components/Introduction'
import Sunflower from './components/Sunflower'
import Services from './components/Services'
import Rooms from './components/Rooms'
import Prices from './components/Prices'
import Gallery from './components/Gallery'

import {Element} from 'react-scroll'


export default class Main extends Component {
  render() {
    return (
      <main>
        <Element name="bemutatkozas">
          <Introduction/>
        </Element>
        <Element name="napraforgo">
          <Sunflower/>
        </Element>
        <Element name="szolgaltatasok">
          <Services/>
        </Element>
        {/* 
        <Element name="szobak">
          <Rooms/>
        </Element>
        <Element name="arak">
          <Prices/>
        </Element>
      */}
        <Element name="galeria">
          <Gallery/>
        </Element> 
      </main>
    )
  }
}