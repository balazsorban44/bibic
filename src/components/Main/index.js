import React, {Component} from 'react'
import Rooms from './Rooms'
import Prices from './Prices'
import Slider from '../shared/Slider'
import Foods from './Foods'


export default class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Rooms/>
        <Prices/>
        <Foods/>
        <Slider
          title="Rendezvények"
          sectionId="rendezvenyek"
          databaseRef="events"
        />
        <Slider
          title="Programok"
          sectionId="programok"
          databaseRef="programs"
          alignRight
        />
      </React.Fragment>
    )
  }
}