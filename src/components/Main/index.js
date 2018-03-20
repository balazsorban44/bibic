import React, {Component} from 'react'
import Introduction from './components/Introduction'
import Sunflower from './components/Sunflower'
import Services from './components/Services'
import Rooms from './components/Rooms'
import Prices from './components/Prices'
import Slider from '../shared/Slider'
import Foods from './components/Foods'

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
        <Element name="szobak">
          <Rooms/>
        </Element>
        <Element name="arak">
          <Prices/>
        </Element> 
        <Element name="etelek">
          <Foods databaseRef="foods"/>
        </Element>
        <Element name="rendezvenyek">
          <Slider
            title="Rendezvények"
            sectionId="rendezvenyek"
            databaseRef="events"
          />
        </Element>  
        <Element name="programok">
          <Slider
            title="Programok"
            sectionId="programok"
            databaseRef="programs"
            alignRight
          />
        </Element> 
      </main>
    )
  }
}