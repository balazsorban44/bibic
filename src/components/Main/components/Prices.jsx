import React, { Component } from 'react'


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
            <button className="price-button">Foglalás</button>
          </li>
          <li>
            <div className="price-content">
              <h3>6.000 <span>Forint/óra</span></h3>
              <h4>Rendezvényterem</h4>
              <h5>terembérlés</h5>
            </div>
            <button className="price-button">Részletek</button>
          </li>
          <li>
            <div className="price-content">
              <h3>90.000+ <span>Forint<sup>*</sup></span> </h3>
              <h4>Teljes ház</h4>
              <h5>maximum 21 fő</h5>
            </div>
            <button className="price-button">E-mail</button>
          </li>
          <li>
            <div className="price-content">
              <h3>Csomag<span className="word-break">ajánlatok</span></h3>
            </div>
            <button className="price-button">Több</button>
          </li>
          <li className="special">
            <a href="mailto:szallasfoglalas@bibicvendeghazak.hu">
              <h4>KÜLÖN</h4>
              <h5>AJÁNLAT</h5>
            </a>
            <span></span>
          </li>
        </ul>
        <p>*Az árak forintban értendők és tartalmazzák a reggeli árát, valamint az idegenforgalmi adót.</p>
      </section>
    )
  }
}