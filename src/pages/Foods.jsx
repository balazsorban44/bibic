import React from 'react'
import {useTranslation} from 'react-i18next'
import Carousel from 'components/Carousel'

const Foods = () => {
  const [t] = useTranslation()
  return (
    <Carousel
      className="foods"
      itemClassName="food"
      section="foods"
      subtitle={t("foods.subtitle")}
      title={t("foods.title")}
    />
  )
}

export default Foods