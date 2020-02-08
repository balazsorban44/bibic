import React from 'react'
import {useTranslation} from 'react-i18next'

import MapImg from "../assets/icons/map.svg"
import MailImg from "../assets/icons/mail.svg"
import TelImg from "../assets/icons/tel-brown.svg"

import FBImg from "../assets/icons/facebook.svg"
import InstaImg from "../assets/icons/instagram.svg"
import YTImg from "../assets/icons/youtube-brown.svg"


const Footer = () => {
  const [t] = useTranslation()
  return (
    <footer id="kapcsolat">
      <div className="contact">
        <ul id="reachout">
          <li>
            <a
              href="https://www.google.com/maps/place/Bibic+vend%C3%A9gh%C3%A1zak/@46.394617,17.505221,17z/data=!4m10!1m2!3m1!2zQmliaWMgdmVuZMOpZ2jDoXphaw!3m6!1s0x0:0x56f9f832e3ba7da3!5m1!1s2018-06-17!8m2!3d46.3948508!4d17.5067407"
              rel="noopener noreferrer"
              target="_blank"
            ><span>7561 Nagybajom, Iskolaköz 3-5.</span>
              <img
                alt={t("footer.map-alt")}
                src={MapImg}
              />
            </a>
          </li>
          <li>
            <a href="mailto:info&#64;bibicvendeghazak.hu"><span>{t("footer.email")}</span>
              <img
                alt={t("footer.mail-alt")}
                src={MailImg}
              />
            </a>
          </li>
          <li>
            <a href="tel:+36305785730"><span>+36 30 578 5730</span>
              <img
                alt={t("footer.tel-alt")}
                src={TelImg}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/Bíbic-Vendegházak-És-Söröző-200199203718517"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt={t("footer.fb-alt")}
                src={FBImg}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/explore/tags/bibicvendeghaz/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt={t("footer.insta-alt")}
                src={InstaImg}
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/Bíbic-Vendegházak-És-Söröző-200199203718517"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                alt={t("footer.yt-alt")}
                src={YTImg}
              />
            </a>
          </li>
        </ul>
      </div>
      <div id="copyright">
        <h4>{`${t("footer.rights-reserved")} ${new Date().getFullYear()}.`}</h4>
        <h4>
          {t("footer.pictures-and-design")}
          <a
            href="https://www.facebook.com/gergo.boos"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("name", {givenName: "Gergő", familyName: "Boós"})}
          </a>
        </h4>
        <h4>
          {t("footer.webpage-and-design")}
          <a
            href="https://balazsorban.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("name", {givenName: "Balázs", familyName: "Orbán"})}
          </a>
        </h4>
        <h6>{t("footer.version-number")}: %REACT_APP_VERSION%</h6>
      </div>
    </footer>
  )
}

export default Footer