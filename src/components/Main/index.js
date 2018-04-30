import React, {Fragment} from 'react'
import Rooms from './Rooms'
import Prices from './Prices'
import Slider from '../shared/Slider'
import Foods from './Foods'


const Main = () =>
  <Fragment>
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
  </Fragment>

export default Main