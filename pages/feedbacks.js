import * as React from 'react'
import {hu} from 'date-fns/locale'
import {formatDistance} from 'date-fns'
import Section from "components/section"

// TODO: Use Sanity or Firebase
import roomsData from "data/rooms.json"
import feedbacksData from "data/feedbacks.json"
import roomFacilitiesData from "data/roomFacilities.json"

const Feedbacks = ({feedbacks, allAvg, rooms}) => {
  return (
      <Section  id="visszajelzesek" title={"Visszajelzések"}>
      <div>
        <h3>Értékelések</h3>
        <Stars
          title="Összesített"
          value={allAvg}
          />
        <div className="room-feedbacks">
          {rooms.map(({roomId, avg}) =>
            <div
            className="room-feedback"
            key={roomId}
            >
              <Stars
                size={18}
                title={`Szoba ${roomId}`}
                value={avg.toFixed(2)}
                />
            </div>
          )}
        </div>
      </div>
      <div>
        <h3>Önök mondták</h3>
        <ul className="feedback-list">
          {feedbacks.map((feedback, index) =>
            <Feedback key={index} {...feedback} />
            )}
        </ul>
      </div>
            </Section>
  )
}

export default Feedbacks


const Feedback = ({content, roomId, timestamp}) =>
  <li
    className="feedback-list-element"
  >
    {roomId.map(id =>
      <span data-room={id} key={id} >{id}</span>
    )}
    {/* TODO: Make this collapsible, if too long */}
    <p>{content}</p>
    <h6>{formatDistance(new Date(timestamp), new Date(), {locale: hu})}</h6>
  </li>


const Stars = ({value, title}) => {
  return (
    <div className="stars-wrapper">
      <div className="stars-header">
        <h4>{title}:</h4>
        <h5>{value}</h5>
      </div>
      <div
        className="stars"
        data-stars={Math.floor(value) || 0}
      >
        {Array(5).fill(null).map((_e, i) =>
          <svg
            className="star rating"
            data-rating={i+1}
            height="25"
            key={i}
            width="25"
          >
            <polygon
              points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
              style={{fillRule: "nonzero"}}
            />
          </svg>
        )}
      </div>
    </div>
  )
}



export const getStaticProps = async () => {
    return ({
      props: {
        feedbacks: feedbacksData
        .filter(({content, accepted}) => accepted && !/^\*{1,5}$/.test(content)),
        allAvg: 5,
        rooms: [
        {
            roomId: 1,
            avg: 3.4
        }
        ]
      }
    })
  }
  