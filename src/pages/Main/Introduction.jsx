import React, {Suspense, lazy} from 'react'
import hegedus from 'assets/images/intro/hegedus.jpg'
import hegedusne from 'assets/images/intro/hegedusne.jpg'
import gombkoto from 'assets/images/intro/gombkoto.jpg'
import Zoom from "react-reveal/Zoom"
import Fade from "react-reveal/Fade"
import {Loading} from 'components/Elements'
import {useTranslation} from 'react-i18next'

const Paragraphs = lazy(() => import("components/Paragraphs"))

const profiles = [
  {
    name: {familyName: "Hegedüs", givenName: "Péter"},
    src: hegedus,
    email: "hegedus@bibicvendeghazak.hu",
    position: "host"
  },
  {
    name: {familyName: "Hegedüsné Kóró", givenName: "Ágnes"},
    src: hegedusne,
    email: "hegedusne@bibicvendeghazak.hu"
  },
  {
    name: {familyName: "Gombkötő", givenName: "Gábor"},
    src: gombkoto,
    email: "gombkoto@bibicvendeghazak.hu"
  }
]

export default () => {
  const [t] = useTranslation()
  return (
    <section id="bemutatkozas">
      <Fade>
        <h2 className="welcome-title">{t("introduction.title")}</h2>
      </Fade>
      <ul className="profiles">
        {profiles.map(({
          name, email, src, position = "owner"
        }) =>
          <Zoom
            duration={600}
            key={email}
          >
            <li >
              <a href={`mailto:${email}`}>
                <img
                  alt={t("name", name)}
                  className="profile-img"
                  src={src}
                />
              </a>
              <div>
                <h3>{t("name", name)}</h3>
                <h5><a href={`mailto:${email}`}>✉ {email} </a></h5>
                <h4>{t(`introduction.position.${position}`)}</h4>
              </div>
            </li>
          </Zoom>
        )}
      </ul>
      <div className="history">
        <Suspense fallback={<Loading/>}>
          <Paragraphs section="introduction"/>
        </Suspense>
      </div>
    </section>
  )
}
