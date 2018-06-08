import React, {Component, Fragment} from 'react'



export default class Feedbacks extends Component {

  render() {
    return (
      <section id="visszajelzesek">
        <h2>Visszajelzések</h2>
        <div className="rating">
          <div className="stars">
            <h3>4.33 / 5.00</h3>
            <ul>
              <li>⭐</li>
              <li>⭐</li>
              <li>⭐</li>
              <li>⭐</li>
              <li style={{filter: "invert(1) sepia(1)"}}>⭐</li>
            </ul>
          </div>

          <ul className="rating-texts">
            <li className="rating-text">Nagyon jó volt, köszönjük. 4/5 </li>
            <li className="rating-text">Jövünk máskor is. 4/5</li>
            <li className="rating-text">Ez igen! 5/5</li>
          </ul>
        </div>
        <div className="new-feedback">
          <label htmlFor="feedback">Kérjük értékeljen bennünket</label>
          <ul>
              <li>⭐</li>
              <li>⭐</li>
              <li>⭐</li>
              <li>⭐</li>
              <li>⭐</li>
            </ul>
          <input placeholder="maximum 120 karakter" name="feedback" type="text"/>
          <button>Visszajelzés beküldése</button>
        </div>
      </section>
    )
  }
}