import React from "react"
import bibic from "assets/icons/bibic-white.png"
import GoogleMaps from "google-map-react"

import {MAPS_API_KEY, MAPS_STYLE} from "lib/google-maps"

const center = {
  lat: 46.3950025,
  lng: 17.506616
}

export const Marker = () =>
  <img
    alt=""
    className="bibic-marker"
    src={bibic}
  />

const Map = () =>
  <div className="map">
    <GoogleMaps
      bootstrapURLKeys={{key: [MAPS_API_KEY]}}
      center={center}
      options={{styles: MAPS_STYLE}}
      zoom={15}
    >
      <Marker
        lat={center.lat}
        lng={center.lng}
      />
    </GoogleMaps>
  </div>

export default Map