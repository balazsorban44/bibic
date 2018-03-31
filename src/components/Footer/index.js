import React, {Component} from 'react'
// import szallas from '../../assets/icons/szallas.svg'
// import bibic from '../../assets/icons/bibic.svg'
// import bibicBird from '../../assets/icons/bibic-white.png'
import booking from '../../assets/icons/booking.svg'
import map from '../../assets/icons/map.svg'
import mail from '../../assets/icons/mail.svg'
import phone from '../../assets/icons/phone.svg'
import facebook from '../../assets/icons/fb.svg'
import instagram from '../../assets/icons/insta.svg'
import youtube from '../../assets/icons/youtube.svg'
import GoogleMaps from 'google-map-react'

const MAPS_API = 'AIzaSyDvnPguJofFhvUbJiNYkR2rlzSvIeZhco8'
const Marker = ({ text }) => <img className="bibic-marker" alt="" src={bibicBird}/>

export default class Footer extends Component {
  render() {
    return (
    <footer id="kapcsolat">
      <div className="map">
        <GoogleMaps
          options={{
            styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
          }}
          bootstrapURLKeys={{ key: [MAPS_API] }}
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
      </div>
      <div className="contact">
        <ul id="logos">
          <li>
            <a href="https://szallas.hu/bibic-vendeghazak-nagybajom" target="_blank" rel="noopener noreferrer" >
              <img alt="" src={szallas}/>
            </a>
          </li>
          <li>
            <a href="https://bibic-vendeghazak.github.io/bibic-vendeghazak-web">
              <img alt="" src={bibic}/>
            </a>
          </li>
          <li>
            <a href="https://www.booking.com/hotel/hu/babic-venda-c-gha-zak-nagybajom.hu.html" target="_blank" rel="noopener noreferrer" >
              <img alt="" src={booking}/>
            </a>
          </li>
        </ul>
        <ul id="reachout">
          <li>
            <a href="https://www.google.com/maps/place/Bibic+vendégházak/@46.394617,17.505221,17z" target="_blank" rel="noopener noreferrer" ><span>7561 Nagybajom, Iskolaköz 3-5.</span>
              <img alt="" src={map}/>
            </a>
          </li>
          <li>
            <a href="mailto:info@bibicvendeghazak.hu"><span>info@bibicvendeghazak.hu</span>
              <img alt="" src={mail}/>
            </a>
          </li>
          <li>
            <a href="tel:+36305785730"><span>+36 30 578 5730</span>
              <img alt="" src={phone}/>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/Bíbic-Vendegházak-És-Söröző-200199203718517" target="_blank" rel="noopener noreferrer" >
              <img alt="" src={facebook}/>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/Bíbic-Vendegházak-És-Söröző-200199203718517" target="_blank" rel="noopener noreferrer" >
              <img alt="" src={instagram}/>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/Bíbic-Vendegházak-És-Söröző-200199203718517" target="_blank" rel="noopener noreferrer" >
              <img alt="" src={youtube}/>
            </a>
          </li>
        </ul>
      </div>
      <div id="copyright">
        <h4> © Minden jog fenntartva.</h4>
        <h4>
          Képek & Design :  <a href="https://www.facebook.com/gergo.boos" target="_blank" rel="noopener noreferrer" >Boós Gergő</a>
        </h4>
        <h4>
          Weblap & Design : <a href="https://balazsorban.com" target="_blank" rel="noopener noreferrer" >Orbán Balázs</a>
        </h4>
      </div>
    </footer>
    )
  }
}