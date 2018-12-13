import React from 'react'
import BANK from '../../assets/icons/bank.png'
import CASH from '../../assets/icons/cash.png'
import MASTERCARD from '../../assets/icons/mastercard.png'
import SZEP from '../../assets/icons/szep.jpg'
import VISA from '../../assets/icons/visa.png'

const Footnote = () => <span className="footnote">Elfogadott fizetési módok
  <ul className="payment-methods">
    <li>
      <h6>Készpénz</h6>
      <img
        alt="Készpénzes fizetés"
        src={CASH}
      />
    </li>
    <li>
      <h6>Előreutalás</h6>
      <img
        alt="Előreutalás"
        src={BANK}
      />
    </li>
    <li>
      <h6>Visa</h6>
      <img
        alt="Visa elfogadóhely"
        src={VISA}
      />
    </li>
    <li>
      <h6>Mastercard</h6>
      <img
        alt="Mastercard elfogadóhely"
        src={MASTERCARD}
      />
    </li>
    <li>
      <h6>OTP SZÉP</h6>
      <img
        alt="OTP SZÉP Kártya elfogadóhely"
        src={SZEP}
      />
    </li>
  </ul>
  FIGYELEM! Felhívjuk figyelmét, hogy a foglalás elküldése fizetési kötelezettséget nem von maga után. Foglalását először jóvá kell hagyjuk. A fizetés helyben, vagy átutalással történik. További részletekért kérdezhet a megjegyzésben, vagy írhat az alábbi címre:
  <a href="mailto:szallasfoglalas@bibicvendeghazak.hu">szallasfoglalas@bibicvendeghazak.hu</a>
</span>

export default Footnote