import React from 'react'
import {Link} from "react-router-dom"
import Fade from "react-reveal/Fade"
import {useTranslation} from 'react-i18next'

export const Prices = () => {
  const [t] = useTranslation()
  return (
    <section id="arak">
      <h2>{t("prices.title")}</h2>
      <Fade
        cascade
        up
      >
        <ul className="price-list">
          <li>
            <div className="price-content">
              <h3>{6000}<span>{t("prices.huf-and-up")}<sup>{"*"}</sup></span></h3>
              <h4>{t("prices.multibed-room")}</h4>
              <h5>{t("prices.2-or-more-people")}</h5>
            </div>
            <Link
              className="price-button"
              to="foglalas"
            >
              {t("reserve")}
            </Link>
          </li>
          <li>
            <div className="price-content">
              <h3>{6000}<span>{t("prices.huf-per-hour")}<sup>{"*"}</sup></span></h3>
              <h4>{t("prices.event-hall")}</h4>
              <h5>{t("prices.hall-rent")}</h5>
            </div>
            <Link
              className="price-button"
              to="uzenet?subject=eventHall"
            >
              {t("prices.write-us")}
            </Link>
          </li>
          <li>
            <div className="price-content">
              <h3>{90000}<span>{t("prices.huf-and-up")}<sup>{"*"}</sup></span></h3>
              <h4>{t("prices.entire-house")}</h4>
              <h5>{t("prices.max-21-people")}</h5>
            </div>
            <Link
              className="price-button"
              to="uzenet?subject=entireHouse"
            >
              {t("prices.write-us")}
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
      <Link to="uzenet?subject=special">
        <div className="special">
          <h4>{t("prices.exclusive-deal.0")}</h4>
          <h5>{t("prices.exclusive-deal.1")}</h5>
          <span></span>
        </div>
      </Link>
      <p>
        {t("prices.disclaimer")}
      </p>
    </section>
  )
}


export default Prices