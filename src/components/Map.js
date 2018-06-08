import React from 'react'
import bibicBird from '../assets/icons/bibic-white.png'
import GoogleMaps from 'google-map-react'

import {MAPS_API_KEY, MAPS_STYLE } from '../lib/google-maps'

const Marker = () => <img className="bibic-marker" alt="" src={bibicBird}/>

const Map = () => (
  <React.Fragment>
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
    </GoogleMaps>
  </React.Fragment> 
)

export default Map