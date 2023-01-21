import React, { Suspense, lazy } from "react";
import hegedus from "../assets/images/intro/hegedus.jpg";
import hegedusne from "../assets/images/intro/hegedusne.jpg";
import gombkoto from "../assets/images/intro/gombkoto.jpg";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import { Loading } from "./shared/Elements";

const Paragraphs = lazy(() => import("./shared/Paragraphs"));

const profiles = [
  {
    name: "Hegedüs Péter",
    src: hegedus,
    email: "info@bibicvendeghazak.hu",
    position: "Bíbic Vendégházak házigazdája",
  },
  {
    name: "Hegedüsné Kóró Ágnes",
    src: hegedusne,
    position: "Tulajdonos",
  },
  {
    name: "Gombkötő Gábor",
    src: gombkoto,
    position: "Tulajdonos",
  },
];

export default () => (
  <section id="bemutatkozas">
    <Fade>
      <h2 className="welcome-title">Üdvözöljük</h2>
    </Fade>
    <ul className="profiles">
      {profiles.map(({ name, email, src, position }) => (
        <Zoom duration={600} key={name}>
          <li>
            <span>
              <img alt={name} className="profile-img" src={src} />
            </span>
            <div>
              <h3>{name}</h3>
              {email ? (
                <h5>
                  <a href={`mailto:${email}`}>✉ {email} </a>
                </h5>
              ) : null}
              <h4>{position}</h4>
            </div>
          </li>
        </Zoom>
      ))}
    </ul>
    <div className="history">
      <Suspense fallback={<Loading />}>
        <Paragraphs path="bemutatkozas" />
      </Suspense>
    </div>
  </section>
);
