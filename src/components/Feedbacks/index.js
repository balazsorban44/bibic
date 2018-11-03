import React from 'react'
import Stars from './Stars'
import {withStore} from '../db'
import {Loading} from '../shared/Elements'
import moment from "../../lib/moment"
import Fade from "react-reveal/Fade"

export const Feedbacks = ({feedbacks}) => {
  const sum = feedbacks.rooms.reduce((acc, room) => room += acc, 0)
  const allAvg = (sum / feedbacks.rooms.length).toFixed(2)

  return (
    <section id="visszajelzesek">
      <h2>Visszajelzések</h2>
      <Fade up>
        <div>
          <h3>Értékelések</h3>
          <Stars
            title="Összesített"
            value={allAvg}
          />
          <div className="room-feedbacks">
            {feedbacks.rooms.map((avg, index) =>
              <div
                className="room-feedback"
                key={index}
              >
                <Stars
                  size={18}
                  title={`Szoba ${index + 1}`}
                  value={avg}
                />
              </div>
            )}
          </div>
        </div>
      </Fade>
      <Fade up>
        <div>
          <h3>Önök mondták</h3>
          <ul className="feedback-list">
            {feedbacks.all.length ? feedbacks.all.map((feedback, index) =>
              <Feedback
                key={index}
                {...feedback}
              />
            ) : <Loading/>}
          </ul>
        </div>
      </Fade>
    </section>
  )
}

export default withStore(Feedbacks)


export const Feedback = ({
  content, roomId, timestamp, ratings
}) =>
  <li
    className="feedback-list-element"
    data-room={roomId}
  >
    <span>{roomId}</span>
    <p>{content !== "" ? content : "*".repeat(ratings.coffee)}</p>
    <h6>{moment(timestamp.toDate()).fromNow()}</h6>
  </li>