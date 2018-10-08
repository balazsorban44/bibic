import React, {Component} from 'react'
import hegedus from '../assets/images/intro/hegedus.jpg'
import hegedusne from '../assets/images/intro/hegedusne.jpg'
import gombkoto from '../assets/images/intro/gombkoto.jpg'
import Paragraphs from './shared/Paragraphs'


const profiles = [
  {
    name: "Hegedüs Péter",
    src: hegedus,
    email: "hegedus@bibicvendeghazak.hu",
    position: "Bíbic Vendégházak házigazdája"
  },
  {
    name: "Hegedüsné Kóró Ágnes",
    src: hegedusne,
    email: "hegedusne@bibicvendeghazak.hu",
    position: "Tulajdonos"
  },
  {
    name: "Gombkötő Gábor",
    src: gombkoto,
    email: "gombkoto@bibicvendeghazak.hu",
    position: "Tulajdonos"
  }
]

export default class Introduction extends Component {
  render() {
    return (
      <section id="bemutatkozas">
        <h2 className="welcome-title">Üdvözöljük</h2>
        <ul className="profiles">
          {profiles.map(({
            name, email, src, position
          }) =>
            <li key={name}>
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
          )}
        </ul>
        <div className="history">
          <Paragraphs path="bemutatkozas"/>
        </div>
      </section>
    )
  }
}