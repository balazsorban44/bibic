import React, {Component} from 'react'
import szallas from '../../media/icons/szallas.svg'
import bibic from '../../media/icons/bibic.svg'
import booking from '../../media/icons/booking.svg'
import map from '../../media/icons/map.svg'
import mail from '../../media/icons/mail.svg'
import phone from '../../media/icons/phone.svg'
import facebook from '../../media/icons/fb.svg'
import instagram from '../../media/icons/insta.svg'
import youtube from '../../media/icons/youtube.svg'


export default class Footer extends Component {
  render() {
    return (
    <footer>
      <div id="map">
        <div id="map-canvas"></div>
      </div>
      <div id="kapcsolat">
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
        <h4>
          © Minden jog fenntartva. <br/> Képek & Design :  <a href="https://www.facebook.com/gergo.boos" target="_blank" rel="noopener noreferrer" >Boós Gergő</a> - 
           Weblap & Design : <a href="https://balazsorban.com" target="_blank" rel="noopener noreferrer" >Orbán Balázs</a>
        </h4>
      </div>
    </footer>
    )
  }
}