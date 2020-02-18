import React from 'react'
import Stars from './Stars'
import {withStore} from '../db'
import {Loading} from '../shared/Elements'
import Fade from "react-reveal/Fade"
import {formatDistance} from 'date-fns'
import {TODAY} from '../../utils/env'
import {useTranslation} from 'react-i18next'
import {useLocale} from 'utils/i18n'

export const Feedbacks = ({feedbacks}) => {
  const rooms = Object.entries(feedbacks.rooms || {})
  const sum = rooms.reduce((acc, [_, value]) => acc + value, 0)
  const allAvg = (sum / rooms.length).toFixed(2)
  const [t] = useTranslation()

  return (
    <section id="visszajelzesek">
      <h2>{t("feedbacks.title")}</h2>
      <Fade up>
        <div>
          <h3>{t("feedbacks.ratings")}</h3>
          <Stars
            title={t("feedbacks.overall")}
            value={allAvg}
          />
          <div className="room-feedbacks">
            {rooms.map(([roomId, avg]) =>
              <div
                className="room-feedback"
                key={roomId}
              >
                <Stars
                  size={18}
                  title={t("room", {id: roomId})}
                  value={avg.toFixed(2)}
                />
              </div>
            )}
          </div>
        </div>
      </Fade>
      <Fade up>
        <div>
          <h3>{t("feedbacks.your-reviews")}</h3>
          <ul className="feedback-list">
            {Array.isArray(feedbacks.all) ? feedbacks.all.length ?
              feedbacks.all
                // Do not show feedbacks with no real content
                .filter(({content}) => !content.includes("*"))
                .map((feedback, index) =>
                  <Feedback
                    key={index}
                    {...feedback}
                  />
                ) : <Loading/> : t("feedbacks.no-reviews")}
          </ul>
        </div>
      </Fade>
    </section>
  )
}

export default withStore(Feedbacks)


export const Feedback = ({content, roomId, timestamp}) => {
  const locale = useLocale()
  return (
    <li
      className="feedback-list-element"
      data-room={roomId}
    >
      <span>{roomId}</span>
      <p>{content}</p>
      <h6>{formatDistance(timestamp, TODAY, {locale})}</h6>
    </li>
  )
}