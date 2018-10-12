import React, {Component} from 'react'
import {Link} from "react-router-dom"
import {withStore} from './db'

class Prices extends Component {

  state = {minPrice: "Betöltés..."}

  componentDidUpdate({rooms: prevRooms}, _prevState) {
    const {rooms} = this.props
    if (prevRooms !== rooms) {
      let minPrice = Infinity
      rooms.forEach(({prices: {table}}) => {
        Object.values(table)
          .reduce((acc, val) => acc.concat(val), [])
          .forEach(adult => {
            adult.forEach(({price}) => {
              minPrice = Math.min(minPrice, price)
            })
          })
      })
      this.setState({minPrice})
    }

  }


  render() {
    return (
      <section id="arak">
        <h2>Árak</h2>
        <ul className="price-list">
          <li>
            <div className="price-content">
              <h3>{this.state.minPrice}<span>-Forinttól<sup>*</sup></span> </h3>
              <h4>Többágyas szoba</h4>
              <h5>két- vagy több fő részére</h5>
            </div>
            <Link
              className="price-button"
              to="foglalas"
            >
              Foglalás
            </Link>
          </li>
          <li>
            <div className="price-content">
              <h3>6000 <span>Forint/óra<sup>*</sup></span></h3>
              <h4>Rendezvényterem</h4>
              <h5>terembérlés</h5>
            </div>
            <Link
              className="price-button"
              to="uzenet?tema=rendezvenyterem"
            >
              Írjon nekünk
            </Link>
          </li>
          <li>
            <div className="price-content">
              <h3>90000+ <span>Forint<sup>*</sup></span> </h3>
              <h4>Teljes ház</h4>
              <h5>maximum 21 fő</h5>
            </div>
            <Link
              className="price-button"
              to="uzenet?tema=teljeshaz"
            >
              Írjon nekünk
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
          <Link to="uzenet?tema=kulonajanlat">
            <li className="special">
              <h4>KÜLÖN</h4>
              <h5>AJÁNLAT</h5>
              <span></span>
            </li>
          </Link>
        </ul>
        <p>*Az árak forintban értendők és tartalmazzák a reggeli árát, valamint az idegenforgalmi adót.</p>
      </section>
    )
  }
}


export default withStore(Prices)