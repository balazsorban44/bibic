import React from 'react'
import {Link} from "react-router-dom"
import {UNSAFE_withStore} from 'db'
import Fade from "react-reveal/Fade"
import { useTranslation } from 'react-i18next';
import routes from 'utils/routes';

const options = [
  {title: 6000, to: routes.RESERVE},
  {title: 6000, to: `${routes.MESSAGE}?subject=eventHall`},
  {title: 90000, to: `${routes.MESSAGE}?subject=fullHouse`}
]

export const Prices = () => {
  const [t] = useTranslation("prices")
  return (

    <section id="arak">
      <h2>{t("title")}</h2>
      <Fade
        cascade
        up
      >

        <ul className="price-list">
          {options.map(({title, to}, index) => {
            const {
              suffix, name, subtitle, button
            } = t(`options.${index}`, {returnObjects: true})
            return (
            <li key={index}>
              <div className="price-content">
                <h3>{title}<span>{suffix}<sup>*</sup></span> </h3>
                <h4>{name}</h4>
                <h5>{subtitle}</h5>
              </div>
              <Link className="price-button" to={to}> {button}</Link>
            </li>
            )
          }
          )}
          {/* <li>
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
          </li> */}
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
      <p>{t("footnote")}</p>
    </section>
  )
}


export default UNSAFE_withStore(Prices)