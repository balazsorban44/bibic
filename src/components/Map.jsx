import React from 'react'
import GoogleMaps from "google-map-react"

import config from 'utils/env'
import styles from 'lib/google-maps.json'
import bibic from 'assets/icons/bibic-white.png'


export const Marker = () =>
  <img
    alt=""
    className="bibic-marker"
    src={bibic}
  />

export default () =>
  <div className="map">
    <GoogleMaps
      bootstrapURLKeys={{key: [config.googleMaps.API_KEY]}}
      center={config.googleMaps.center}
      options={{styles}}
      zoom={config.googleMaps.zoom}
    >
      <Marker {...config.googleMaps.center}/>
    </GoogleMaps>
  </div>