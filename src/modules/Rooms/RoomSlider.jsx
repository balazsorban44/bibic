import React, {useState, useEffect, useCallback} from "react"
import Button from "ui/Button"
import {useTranslation} from "react-i18next"
import {useRoomGallery} from "hooks/data/useGallery"


export const RoomSlider = ({room, delay}) => {
  const pictures = useRoomGallery(room)[0]
    .sort((a, b) => a.order - b.order)


  const [activeIndex, setActiveIndex] = useState(0)

  const handleTick = useCallback(() => {
    setActiveIndex(prevIndex =>
      prevIndex + 1 === pictures.length ? 0 : prevIndex + 1
    )
  }, [pictures.length])

  useEffect(() => {
    const tick = setInterval(handleTick, delay)
    return () => clearInterval(tick)
  }, [delay, handleTick])

  const [t] = useTranslation("common")

  return(
    <div className="room-slider-container">
      <ul className="room-slider">
        {pictures
          .map((picture, index) =>
            <Slide
              active={activeIndex===index}
              index={index}
              key={index}
              {...picture}
            />
          )}
      </ul>
      <Dots
        activeIndex={activeIndex}
        length={pictures.length}
      />
      <Button
        alt={t("next-slide")}
        circle
        className="room-slider-next-btn"
        onClick={handleTick}
      />
    </div>
  )
}


RoomSlider.defaultProps = {delay: 10000}


export const Slide = ({active, index, fileName, SIZE_640, SIZE_1024, SIZE_1440}) =>
  <li
    className={active ? "room-first-slide" : "room-placeholder-slide"}
    style={{zIndex: active ? 99 : -index}}
  >
    <picture>
      <source
        media="(min-width: 640px)"
        srcSet={SIZE_1024}
      />
      <source
        media="(min-width: 1024px)"
        srcSet={SIZE_1440}
      />
      <img
        alt={fileName}
        src={SIZE_640}
      />
    </picture>
  </li>


export const Dots = ({length, activeIndex}) =>
  <div className="room-slider-dots">
    {Array.from({length}).map((_, i) =>
      <span
        children="•"
        className={
          `room-slider-dot ${activeIndex===i ?"active-slide": ""}`}
        key={i}
      />
    )}
  </div>