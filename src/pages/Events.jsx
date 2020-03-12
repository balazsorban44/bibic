import React from 'react'
import {useTranslation} from 'react-i18next'
import Carousel from 'components/Carousel'

const Events = () => {
  const [t] = useTranslation()
  return (
    <Carousel
      className="events"
      itemClassName="event"
      section="events"
      title={t("events.title")}
    />
  )
}

export default Events