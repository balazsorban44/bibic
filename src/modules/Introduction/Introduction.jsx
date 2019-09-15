import React, {Suspense, lazy} from "react"
import {useTranslation} from "react-i18next"
import Zoom from "react-reveal/Zoom"


import hegedus from "assets/images/profiles/hegedus.jpg"
import hegedusne from "assets/images/profiles/hegedusne.jpg"
import gombkoto from "assets/images/profiles/gombkoto.jpg"

import Loading from "components/Loading"
import Text from "components/Text"
import Page from "components/Page"

import "./introduction.sass"

const Paragraphs = lazy(() => import("components/Paragraphs"))

const profiles = [
  {
    name: {
      family: "Hegedüs",
      given: "Péter"
    },
    src: hegedus,
    email: "hegedus@bibicvendeghazak.hu",
    role: "host"
  },
  {
    name: {
      family: "Hegedüsné Kóró",
      given: "Ágnes"
    },
    src: hegedusne,
    email: "hegedusne@bibicvendeghazak.hu",
    role: "owner"
  },
  {
    name: {
      family: "Gombkötő",
      given: "Gábor"
    },
    src: gombkoto,
    email: "gombkoto@bibicvendeghazak.hu",
    role: "owner"
  }
]


export default function Introduction() {
  const [t] = useTranslation("introduction")
  return (
    <Page id="bemutatkozas"
      title={t("title")}
      titleProps={{className: "welcome-title"}}
    >
      <ul className="profiles">
        {profiles.map(Profile({t}))}
      </ul>
      <Suspense fallback={<Loading/>}>
        <Paragraphs
          className="history"
          type="bemutatkozas"
        />
      </Suspense>
    </Page>
  )
}

const Profile = ({t}) => ({name, email, src, role}) =>
  <Zoom duration={600} key={email}>
    <li className="profile">
      <a href={`mailto:${email}`}>
        <img
          alt={name}
          className="profile-img"
          src={src}
        />
      </a>
      <Text variant="h4">{t("name", {name})}</Text>
      <Text variant="h6">
        <a href={`mailto:${email}`}>✉ {email} </a>
      </Text>
      <Text variant="h5">{t(`roles.${role}`)}</Text>
    </li>
  </Zoom>