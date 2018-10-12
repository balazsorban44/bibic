import React, {Component} from 'react'
import bibicBird from '../assets/icons/bibic-white.png'

import {MAPS_API_KEY, MAPS_STYLE } from '../lib/google-maps'
import { Loading } from './shared/Elements';

const Marker = () => <img className="bibic-marker" alt="" src={bibicBird}/>

export default class extends Component {

  state = {
    GoogleMaps: null
  }

  componentDidMount() {
    import("google-map-react").then(({default: GoogleMaps}) =>
      this.setState({GoogleMaps})
    )
  }

  render() {
    const {GoogleMaps} = this.state
    return(
      GoogleMaps ?
        <GoogleMaps
          options={{
            styles: MAPS_STYLE
          }}
          bootstrapURLKeys={{ key: [MAPS_API_KEY] }}
          center={{
            lat: 46.3950025,
            lng: 17.506616
          }}
          zoom={15}
        >
          <Marker
            lat={46.3950025}
            lng={17.506616}
          />
        </GoogleMaps> : <Loading/>
    )
  }
}