import React from 'react'

const profiles = [
  {
    name: "Hegedüs Péter",
    src: "/images/intro/hegedus.jpg",
    email: "hegedus@bibicvendeghazak.hu",
    position: "Bíbic Vendégházak házigazdája"
  },
  {
    name: "Hegedüsné Kóró Ágnes",
    src: "/images/intro/hegedusne.jpg",
    email: "hegedusne@bibicvendeghazak.hu",
    position: "Tulajdonos"
  },
  {
    name: "Gombkötő Gábor",
    src: "/images/intro/gombkoto.jpg",
    email: "gombkoto@bibicvendeghazak.hu",
    position: "Tulajdonos"
  }
]

const Introduction = ({paragraphs}) =>
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
      {paragraphs.map(({text}, index) =>
        <p key={index}>{text}</p>
      )}
    </div>
  </section>

export default Introduction