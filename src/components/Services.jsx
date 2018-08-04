import React from 'react'
import {Data} from './db'
import {Button, Loading} from './shared/Elements'


const Services = () =>
  <section id="szolgaltatasok">
    <h2>Szolgáltatásaink</h2>
    <ServicesList highlightedOnly/>
    {/* <ul>
      <li>
        <img
          alt="Szolgáltatás kép 1."
          src={services1}
        />
        <p>Klimatizált konferencia terem, bárpulttal, sörcsappal, vinotékával (50 főig).</p>
      </li>
      <li>
        <img
          alt="Szolgáltatás kép 2."
          src={services2}
        />
        <p>Klimatizált helyiségek, fürdőszobás szobák, felszerelt konyha, tágas étkező-nappali, előadó terem.</p>
      </li>
      <li>
        <img
          alt="Szolgáltatás kép 3."
          src={services3}
        />
        <p>Kerti konyha, kemencével, bográcshellyel, csikó tűzhellyel (rem sütő), grillezővel, füstölővel, kerti bútorral.</p>
      </li>
    </ul> */}
    <div className="services-footer">
      <p>Az aktív pihenést kedvelőknek ping pong asztal és kerékpárok, a gyermekeknek játszótér áll rendelkezésére.</p>
      <Button
        label="További szolgáltatásaink →"
        to="szolgaltatasok"
      />
    </div>
  </section>

export default Services


export const ServicesList = ({highlightedOnly=false}) =>
  <Data.Consumer>
    {({state: {services}}) =>
      <ul>
        {services && services.metadata && services.pictures ?
          Object.entries(services.metadata)
            .filter(([serviceId, {highlighted}]) => highlightedOnly ? highlighted : true)
            .map(([serviceId, {desc}]) =>
              <li key={serviceId}>
                <img
                  alt={`Szolgáltatás ${serviceId}`}
                  src={services.pictures[serviceId] && services.pictures[serviceId].SIZE_1024}
                />
                <p>{desc}</p>
              </li>)
          : <Loading/>}
      </ul>
    }
  </Data.Consumer>
