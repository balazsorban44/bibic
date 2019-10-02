import React, {Suspense, lazy} from "react"
import {useTranslation} from "react-i18next"
import Zoom from "react-reveal/Zoom"


import hegedus from "assets/images/profiles/hegedus.jpg"
import hegedusne from "assets/images/profiles/hegedusne.jpg"
import gombkoto from "assets/images/profiles/gombkoto.jpg"

import Loading from "ui/Loading"
import Text from "ui/Text"
import Section from "ui/Section"

import "./introduction.sass"
import colors from "ui/utils/colors"

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


const Profile = ({t}) => ({name, email, src, role}) =>
  <Zoom duration={600} key={email}>
    <li className="profile">
      <img
        alt={name}
        className="profile-img"
        src={src}
      />
      <Text variant="h3">
        {t("name", {name})}
      </Text>
      <Text variant="h4">
        <a href={`mailto:${email}`}>✉ {email} </a>
      </Text>
      <Text variant="h5">
        {t(`roles.${role}`)}
      </Text>
    </li>
  </Zoom>


const Introduction = () => {
  const [t] = useTranslation("introduction")
  return (
    <Section
      bg="noisy"
      id="bemutatkozas"
      title={t("title")}
      titleProps={{style: {color: colors.accentColor2}}}
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
    </Section>
  )
}

export default Introduction