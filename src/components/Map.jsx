import React from 'react'
import bibic from '../assets/icons/bibic-white.png'
import GoogleMaps from "google-map-react"

import {MAPS_API_KEY, MAPS_STYLE} from '../lib/google-maps'


export const Marker = () =>
  <img
    alt=""
    className="bibic-marker"
    src={bibic}
  />

export default () =>
  <div className="map">
    <GoogleMaps
      bootstrapURLKeys={{key: [MAPS_API_KEY]}}
      center={{lat: 46.3950025,
        lng: 17.506616}}
      options={{styles: MAPS_STYLE}}
      zoom={15}
    >
      <Marker
        lat={46.3950025}
        lng={17.506616}
      />
    </GoogleMaps>
  </div>