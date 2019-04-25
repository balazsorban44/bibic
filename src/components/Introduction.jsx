import React, {Suspense, lazy} from 'react'
import hegedus from '../assets/images/intro/hegedus.jpg'
import hegedusne from '../assets/images/intro/hegedusne.jpg'
import gombkoto from '../assets/images/intro/gombkoto.jpg'
import Zoom from "react-reveal/Zoom"
import Fade from "react-reveal/Fade"
import {Loading} from './shared/Elements'
import { useTranslation } from 'react-i18next';

const Paragraphs = lazy(() => import("./shared/Paragraphs"))

const profiles = [
  {
    name: {
      surname: "Hegedüs",
      firstName: "Péter"
    },
    src: hegedus,
    email: "hegedus@bibicvendeghazak.hu",
    position: "host"
  },
  {
    name: {
      surname: "Hegedüsné",
      firstName: "Kóró Ágnes"
    },
    src: hegedusne,
    email: "hegedusne@bibicvendeghazak.hu",
    position: "owner"
  },
  {
    name: {
      surname: "Gombkötő",
      firstName: "Gábor"
    },
    src: gombkoto,
    email: "gombkoto@bibicvendeghazak.hu",
    position: "owner"
  }
]

export default () => {
  const [t] = useTranslation("introduction")
  return (
  <section id="bemutatkozas">
    <Fade>
      <h2 className="welcome-title">{t("title")}</h2>
    </Fade>
    <ul className="profiles">
      {profiles.map(({
        name, email, src, position
      }) => {
        name = t("name", {name})
        position = t(`positions.${position}`)
        return (
          <Zoom
            duration={600}
            key={name}
          >
            <li >
              <a href={`mailto:${email}`}>
                <img
                  alt={name}
                  className="profile-img"
                  src={src}
                />
              </a>
              <div>
                <h3>{name}</h3>
                <h5><a href={`mailto:${email}`}>✉ {email} </a></h5>
                <h4>{position}</h4>
              </div>
            </li>
          </Zoom>
        )
      }
      )}
    </ul>
    <div className="history">
      <Suspense fallback={<Loading/>}>
        <Paragraphs path="bemutatkozas"/>
      </Suspense>
    </div>
  </section>
  )
}