import React from 'react'
import {Link} from "react-router-dom"
import {withStore} from './db'
import Fade from "react-reveal/Fade"

export const Prices = () =>
  <section id="arak">
    <h2>Árak</h2>
    <Fade
      cascade
      up
    >

      <ul className="price-list">
        <li>
          <div className="price-content">
            <h3>6000<span>-Forinttól<sup>*</sup></span> </h3>
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
            <h3>6000 <span>Forint/órától<sup>*</sup></span></h3>
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
            <h3>90000<span>Forinttól<sup>*</sup></span> </h3>
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
        {/* NOTE: Lists do not contain only <li> elements and script supporting elements (<script> and <template>).
 */}
      </ul>
    </Fade>
    {/* <Link to="uzenet?tema=kulonajanlat">
          <div className="special">
            <h4>KÜLÖN</h4>
            <h5>AJÁNLAT</h5>
            <span></span>
          </div>
        </Link> */}
    <p>
          *Az árak forintban értendők és tartalmazzák a reggeli árát. Az idegenforgalmi adó plusz költségként jelentkezik (településünkön ez 300Ft/fő/nap 18 éves kor felett). Rendezvényterem és teljes ház bérlésének esetén egyedi árszabást alkalmazunk.
    </p>
  </section>


export default withStore(Prices)