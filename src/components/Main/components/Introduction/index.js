import React from 'react'

import hegedus from '../../../../media/images/other/hegedus.jpg'
import hegedusne from '../../../../media/images/other/hegedusne.jpg'
import gombkoto from '../../../../media/images/other/gombkoto.jpg'

const Introduction = () => (
  <section id="bemutatkozas">
    <ul className="profiles">
      <li>
        <img className="profile-img" src={hegedus} alt="Hegedüs Péter"/>
        <div>
          <h3>Hegedüs Péter</h3>
          <h4>Bíbic Vendégházak házigazdája</h4>
        </div>
      </li>
      <li>
        <img className="profile-img" src={hegedusne} alt="Hegedüsné Kóró Ágnes"/>
        <div>
          <h3>Hegedüsné Kóró Ágnes</h3>
          <h4>Fauna ház tulajdonosa</h4>
        </div>
      </li>
      <li>
        <img className="profile-img" src={gombkoto} alt="Gombkötő Gábor"/>
        <div>
          <h3>Gombkötő Gábor</h3>
          <h4>Flóra ház tulajdonosa</h4>
        </div>
      </li>
    </ul>
    <div className="history">
      <p>A nagybajomi panzió, illetve vendégház tervét családi ötletelés - <b>Hegedüs Péter</b> és <b>Gombkötő Gábor</b>, testvérek vagyunk - alkalmával találtuk ki <b>1998</b>-ban.</p>
      <p>Hosszú évekig csak ötlet, illetve tervezgetés maradt a finanszírozás hiánya miatt. 2008-ban azonban a <b>Mezőgazdasági és Vidékfejlesztési Hivatal pályázat</b>ot írt ki, turisztikai fejlesztések támogatására.</p>
      <p>Ekkor, <b>két négy napraforgós vendégház</b> építésére támogatási kérelmet nyújtottunk be - Hegedüsné Kóró Ágnes és Gombkötő Gábor - a Hivatalhoz, melyet 2009-ben meg is ítéltek számunkra. Az előkészületek és az előfinanszírozás megszervezése után 2010-ben elkezdődhetett a <a href="#szobak">Flóra ház </a>építése. <b>2012-ben kaptunk működési engedélyt.</b> Jelenleg az utolsó fázis van folyamatban, kertépítés, parkosítás.</p>
    </div>
  </section>
)

export default Introduction