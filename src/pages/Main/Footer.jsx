import React from 'react'
import {useTranslation} from 'react-i18next'

import MapImg from "assets/icons/map.svg"
import MailImg from "assets/icons/mail.svg"
import TelImg from "assets/icons/tel-brown.svg"
import FBImg from "assets/icons/facebook.svg"
import InstaImg from "assets/icons/instagram.svg"
import YTImg from "assets/icons/youtube-brown.svg"

import config from 'utils/env'


const Footer = () => {
  const [t] = useTranslation()
  return (
    <footer id="kapcsolat">
      <div className="contact">
        <ul id="reachout">
          <li>
            <a
              href={config.googleMaps.URL}
              rel="noopener noreferrer"
              target="_blank"
            ><span>{config.contact.ADDRESS}</span>
              <img
                alt={t("footer.map-alt")}
                src={MapImg}
              />
            </a>
          </li>
          <li>
            <a href={`mailto:info&#64;${config.app.DOMAIN}`}><span>{t("footer.email")}</span>
              <img
                alt={t("footer.mail-alt")}
                src={MailImg}
              />
            </a>
          </li>
          <li>
            <a href={`tel:${config.contact.TEL_SHORT}`}><span>{config.contact.TEL_LONG}</span>
              <img
                alt={t("footer.tel-alt")}
                src={TelImg}
              />
            </a>
          </li>
          <li>
            <a
              href={config.contact.FACEBOOK_URL}
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
              href={config.contact.INSTAGRAM_URL}
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
              href={config.contact.YOUTUBE_URL}
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
        <h4>{`${t("footer.rights-reserved")} ${config.app.YEAR}.`}</h4>
        <h4>
          {t("footer.pictures-and-design")}
          <a
            href={config.contact.GERGO_BOOS_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("name", {givenName: "Gergő", familyName: "Boós"})}
          </a>
        </h4>
        <h4>
          {t("footer.webpage-and-design")}
          <a
            href={config.contact.BALAZS_ORBAN_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("name", {givenName: "Balázs", familyName: "Orbán"})}
          </a>
        </h4>
        <h6>{t("footer.version-number")}{":"} {config.app.VERSION}</h6>
      </div>
    </footer>
  )
}

export default Footer