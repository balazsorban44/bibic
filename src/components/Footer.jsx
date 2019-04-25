import React from 'react';

import map from "assets/icons/map.svg"
import mail from "assets/icons/mail.svg"
import tel from "assets/icons/tel.svg"
import facebook from "assets/icons/facebook.svg"
import instagram from "assets/icons/instagram.svg"
import youtube from "assets/icons/youtube.svg"

import { useTranslation } from 'react-i18next';

export default () => {
  const [t] = useTranslation("footer")
  return (
    <footer id="kapcsolat">
      <div className="contact">
        <ul id="reachout">
          <li>
            <a href="https://www.google.com/maps/place/Bibic+vend%C3%A9gh%C3%A1zak/@46.394617,17.505221,17z/data=!4m10!1m2!3m1!2zQmliaWMgdmVuZMOpZ2jDoXphaw!3m6!1s0x0:0x56f9f832e3ba7da3!5m1!1s2018-06-17!8m2!3d46.3948508!4d17.5067407" target="_blank" rel="noopener noreferrer" ><span>7561 Nagybajom, Iskolaköz 3-5.</span>
              <img alt="" src={map}/>
            </a>
          </li>
          <li>
            <a href="mailto:info&#64;bibicvendeghazak.hu"><span>{t("email")}</span>
              <img alt="" src={mail}/>
            </a>
          </li>
          <li>
            <a href="tel:+36305785730"><span>+36 30 578 5730</span>
              <img alt="" src={tel}/>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/Bíbic-Vendegházak-És-Söröző-200199203718517" target="_blank" rel="noopener noreferrer" >
              <img alt="" src={facebook}/>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/explore/tags/bibicvendeghaz/" target="_blank" rel="noopener noreferrer" >
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
        <h4>{t("all-rights-reserved")}.</h4>
         {/* NOTE: Background and foreground colors do not have a sufficient contrast ratio. */}
        <h4>
          {t("images-design")} :  <a href="https://www.facebook.com/gergo.boos" target="_blank" rel="noopener noreferrer" >Boós Gergő</a>
        </h4>
        <h4>
          {t("code-design")} : <a href="https://balazsorban.com" target="_blank" rel="noopener noreferrer" >Orbán Balázs</a>
        </h4>
        <h6>{t("version")}: {process.env.REACT_APP_VERSION}</h6>
      </div>
    </footer>
  );
}