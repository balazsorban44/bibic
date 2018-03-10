import React from 'react'


const Prices = () => (
  <section id="arak">
        <h2>Árak</h2>
        <ul>
          <li>
            <h4>7.000<span>Ft-tól*</span>
            </h4>
            <h5>Kétágyas szoba<span>2 fő részére</span>
            </h5>
            {/* <!-- TODO Add e-mail form ✉️--> */}
            <a className="reserve-btn" href="mailto:szallasfoglalas@bibicvendeghazak.hu" data-price="7.000" data-room-size="2">Foglalás</a>
          </li>
          <li>
            <h4>6.000<span>Ft-tól*</span>
            </h4>
            <h5>Háromágyas szoba<span>akár 5 fő részére</span>
            </h5>
            {/* <!-- TODO Add e-mail form ✉️--> */}
            <a className="reserve-btn" href="mailto:szallasfoglalas@bibicvendeghazak.hu" data-price="6.000" data-room-size="akár 5">Foglalás</a>
          </li>
          <li>
            <h4>90.000<span>Forint*</span>
            </h4>
            <h5>Teljes ház<span>maximum 19 fő részére</span>
            </h5>
            {/* <!-- TODO Add e-mail form ✉️--> */}
            <a className="reserve-btn" href="mailto:szallasfoglalas@bibicvendeghazak.hu" data-price="90.000" data-room-size="maximum 19">Foglalás</a>
          </li>
          <li>
            <h4>16.000<span>Ft-tól*</span>
            </h4>
            <h5>Söröző<span>terembérlés</span>
            </h5>
            <a href="mailto:szallasfoglalas@bibicvendeghazak.hu">Részletek</a>
          </li>
          <li id="special">
          <a href="mailto:szallasfoglalas@bibicvendeghazak.hu">
              <h4>Egyedi<br/>ajánlat</h4>
              </a>
              <span>
                </span>
              </li>
        </ul>
        <h3>*Az árak forintban értendők és tartalmazzák a reggeli árát, valamint az idegenforgalmi adót.               </h3>
        <form id="reserve-form">
          <h1>Szobafoglalás</h1>
          <span className="close-form-btn">
          </span>
          <fieldset>
            <legend>Személyi adatok</legend>
            <div className="field">
              <label>Név</label>
              <input className="form-name" type="text" name="name" placeholder="Az Ön neve" required/>
            </div>
            <div className="field">
              <label>E-mail</label>
              <input className="form-email" type="email" name="_replyto" placeholder="Az Ön e-mail címe" required/>
            </div>
            <div className="field">
              <label>Telefon</label>
              <input className="form-tel" type="tel" placeholder="Az Ön telefonszáma" required/>
            </div>
            <div className="field">
              <label>Felnőtt:</label>
              <input className="form-adults" type="number" min="1" value="1" placeholder="1" required/>
            </div>
            <div className="field">
              <label>Gyerek:</label>
              <input className="form-children" type="number" min="0" value="0" placeholder="0" required/>
            </div>
            <div className="field">
              <label>Szoba</label>
              <input className="form-name" type="number" min="0" max="6" name="name" required/>
            </div>
          </fieldset>
          <fieldset id="reservation-date">
            <legend>Dátumok</legend>
            <div className="field" id="arrival-date">
              <label>Érkezés</label>
              <input type="date" date-format="YYYY-MM-DD" required/>
            </div>
            <div className="field" id="departure-date">
              <label>Távozás</label>
              <input type="date" required/>
            </div>
          </fieldset>
          <fieldset>
            <legend>Egyéb információ</legend>
            <div className="form-text field">
              <textarea data-name="text" placeholder="Írjon nekünk...">
              </textarea>
            </div>
          </fieldset>
          <textarea className="form-message" name="message" defaultValue="">
          </textarea>
          <input className="send-btn" type="submit" value="Foglalás"/>
        </form>
      </section>
)


export default Prices