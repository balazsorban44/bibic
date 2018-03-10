import React from 'react'
import {Link} from 'react-scroll'
import service1 from '../../../media/images/gallery/9.jpg'
import service2 from '../../../media/images/gallery/1.jpg'
import service3 from '../../../media/images/gallery/17.jpg'

const Services = () => (
  <section id="szolgaltatasok">
    <h2>Szolgáltatásaink</h2>
    <ul>
      <li>
        <img src={service1} alt="Szolgáltatás kép"/>
        <p>Klimatizált konferencia terem, bárpulttal, sörcsappal, vinotékával (50 főig).</p>
      </li>
      <li>
        <img src={service2} alt="Szolgáltatás kép"/>
        <p>Klimatizált helyiségek, fürdőszobás szobák, felszerelt konyha, tágas étkező-nappali, előadó terem.</p>
      </li>
      <li>
        <img src={service3} alt="Szolgáltatás kép"/>
        <p>Kerti konyha, kemencével, bográcshellyel, csikó tűzhellyel (rem sütő), grillezővel, füstölővel, kerti bútorral.</p>
      </li>
    </ul>
    <p>Az aktív pihenést kedvelőknek ping pong asztal és kerékpárok, a gyermekeknek játszótér áll rendelkezésére.</p>
    
    {/* <Link smooth to="galeria">Galériához</Link> */}
  </section>
)

export default Services