import React from "react"
import {useTranslation} from "react-i18next"
import Fade from "react-reveal/Fade"

import Stars from "./Stars"

import "./feedbacks.sass"
import Text from "ui/Text"
import useSubscription from "hooks/useSubscription"
import Loading from "ui/Loading"
import Section from "ui/Section"

export default function Feedbacks() {
  const [t] = useTranslation("feedbacks")

  const [feedbacks, feedbacksLoading] = useSubscription({
    collection: "feedbacks",
    where: ["accepted", "==", true],
    initialState: []
  })

  const [roomRatings, roomRatingsLoading] = useSubscription({
    ref: "roomRatings",
    initialState: {avg: null, values: []},
    localize: false
  })

  return (
    <Section
      id="visszajelzesek"
      title={t("title")}
    >
      <Fade left>
        <div>
          <Text variant="h3">{t("ratings")}</Text>
          <Stars
            title={t("overall")}
            value={roomRatings.avg}
          />
          <div className="room-feedbacks">
            {roomRatingsLoading ? <Loading/> :
              Object.entries(roomRatings.values).map(RoomRating({t}))}
          </div>
        </div>
      </Fade>
      <div className="feedback-list-container">
        <Fade right>
          <Text variant="h3">{t("you-said")}</Text>
        </Fade>
        <ul className="feedback-list">
          {!feedbacksLoading && feedbacks.length ?
            feedbacks
              .filter(({content}) => !/^\**$/.test(content)) // Content is more than *
              .map( feedback =>
                <Fade key={feedback.id} right>
                  <Feedback {...feedback}/>
                </Fade>
              ) :
            <Fade right>
              {t("no-feedback")}
            </Fade>
          }
        </ul>
      </div>
    </Section>
  )
}

const RoomRating = ({t}) => ([roomId, value]) =>
  <div
    className="room-feedback"
    key={roomId}
  >
    <Stars
      size={18}
      title={t("room", {roomNumber: roomId})}
      value={value}
    />
  </div>


export const Feedback = ({content, rooms, timestamp}) => {
  const [t] = useTranslation("common")

  return (
    <li className="feedback-list-item">
      <div className="rooms" title={t("reserved-rooms", {count: rooms.length})}>
        {rooms.map(room =>
          <span className={`room-circle room-circle-${room}`} key={room}>{room}</span>
        )}
      </div>
      <p>{content}</p>
      <h6>{t("relative-date", {value: timestamp.toDate()})}</h6>
    </li>
  )
}