import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class Prices extends Component {
  componentDidMount() {
    //TODO: Fetch prices and info      
  } 
  render() {
    return (
      <section id="arak">
        <h2>Árak</h2>
        <ul className="price-list">
          <li>
            <div className="price-content">
              <h3>6.000<span>-Forinttól<sup>*</sup></span> </h3>
              <h4>Többágyas szoba</h4>
              <h5>két- vagy több fő részére</h5>
            </div>
            <Link className="price-button" to="foglalas">
              Foglalás
            </Link>
          </li>
          <li>
            <div className="price-content">
              <h3>6.000 <span>Forint/óra</span></h3>
              <h4>Rendezvényterem</h4>
              <h5>terembérlés</h5>
            </div>
            <Link className="price-button" to="uzenet?tema=rendezvenyterem">
              Részletek
            </Link>
          </li>
          <li>
            <div className="price-content">
              <h3>90.000+ <span>Forint<sup>*</sup></span> </h3>
              <h4>Teljes ház</h4>
              <h5>maximum 21 fő</h5>
            </div>
            <Link className="price-button" to="uzenet?tema=teljeshaz">
              Részletek
            </Link>
          </li>
          {/* <li>
            <div className="price-content">
              <h3>Csomag<span className="word-break">ajánlatok</span></h3>
            </div>
            <a className="price-button" target="_black" href="mailto:szallasfoglalas@bibicvendeghazak.hu?subject=Csomagajánlatok&body=Név:%0ATelefonszám:">
              Több
            </a>
          </li> */}
          <li className="special">
            <Link to="uzenet?tema=kulonajanlat">
              <h4>KÜLÖN</h4>
              <h5>AJÁNLAT</h5>
            </Link>
            <span></span>
          </li>
        </ul>
        <p>*Az árak forintban értendők és tartalmazzák a reggeli árát, valamint az idegenforgalmi adót.</p>
      </section>
    )
  }
}