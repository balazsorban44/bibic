import React, {Component} from 'react'
import hegedus from '../assets/images/intro/hegedus.jpg'
import hegedusne from '../assets/images/intro/hegedusne.jpg'
import gombkoto from '../assets/images/intro/gombkoto.jpg'
import DynamicParagraphs from './shared/DynamicParagraphs'

export default class Introduction extends Component {
  render() {
    return (
      <section id="bemutatkozas">
        <h2 className="welcome-title">Üdvözöljük</h2>
        <ul className="profiles">
          <li>
            <img className="profile-img" src={hegedus} alt="Hegedüs Péter"/>
            <div>
              <h3>Hegedüs Péter</h3>
              <h5>
                <a 
                  href="mailto:hegedus@bibicvendeghazak.hu">hegedus@bibicvendeghazak.hu
                </a>
              </h5>
              <h4>Bíbic Vendégházak házigazdája</h4>
            </div>
          </li>
          <li>
            <img className="profile-img" src={hegedusne} alt="Hegedüsné Kóró Ágnes"/>
            <div>
              <h3>Hegedüsné Kóró Ágnes</h3>
              <h5>
                <a 
                  href="mailto:hegedusne@bibicvendeghazak.hu">hegedusne@bibicvendeghazak.hu
                </a>
              </h5>
              <h4>Fauna ház tulajdonosa</h4>
            </div>
          </li>
          <li>
            <img className="profile-img" src={gombkoto} alt="Gombkötő Gábor"/>
            <div>
              <h3>Gombkötő Gábor</h3>
              <h5>
                <a 
                  href="mailto:gombkoto@bibicvendeghazak.hu">gombkoto@bibicvendeghazak.hu
                </a>
              </h5>
              <h4>Flóra ház tulajdonosa</h4>
            </div>
          </li>
        </ul>
        <div className="history">
          <DynamicParagraphs path="history"/>
        </div>
      </section>
    )
  }
}