import React from 'react'

import services1 from '../assets/images/services/1.jpg'
import services2 from '../assets/images/services/2.jpg'
import services3 from '../assets/images/services/3.jpg'

const Services = () =>
  <section id="szolgaltatasok">
    <h2>Szolgáltatásaink</h2>
    <ul>
      <li>
        <img src={services1} alt="Szolgáltatás kép 1."/>
        <p>Klimatizált konferencia terem, bárpulttal, sörcsappal, vinotékával (50 főig).</p>
      </li>
      <li>
        <img src={services2} alt="Szolgáltatás kép 2."/>
        <p>Klimatizált helyiségek, fürdőszobás szobák, felszerelt konyha, tágas étkező-nappali, előadó terem.</p>
      </li>
      <li>
        <img src={services3} alt="Szolgáltatás kép 3."/>
        <p>Kerti konyha, kemencével, bográcshellyel, csikó tűzhellyel (rem sütő), grillezővel, füstölővel, kerti bútorral.</p>
      </li>
    </ul>
    <p>Az aktív pihenést kedvelőknek ping pong asztal és kerékpárok, a gyermekeknek játszótér áll rendelkezésére.</p>
  </section>

export default Services