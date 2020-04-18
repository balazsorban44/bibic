import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Link from 'next/link'

const Rooms = ({rooms}) =>
  <section id="szobak">
    <h2>Szobák</h2>
    <ul className="rooms">
      {rooms.map(room =>
        <Room key={room.id} {...room}/>
      )}
    </ul>
  </section>

export default Rooms

const Room = ({id, name, description, pictures, facilities}) =>
  <li
    className={`room szoba-${id}`}
    id={`szoba-${id}`}
  >
    <h3 className="room-title" >{name}</h3>
    <RoomSlider pictures={pictures} />
    <p className="room-description" >{description}</p>
    <div className="room-services">
      {facilities
        .map(([key, {name, icon}]) =>
          <img
            alt={name}
            className="room-service service-in-room"
            key={key}
            src={icon}
            title={name}
          />
        )
      }
    </div>
    <div className="button room-reserve-btn">
      <Link
        as={`/foglalas?szoba=${id}`}
        href={{
          pathname: "/reserve",
          query: {szoba: id}
        }}
      >
        <a>Lefoglalom</a>
      </Link>
    </div>
  </li>


const RoomSlider = ({pictures = []}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const showNext = () => {
    setActiveIndex(currentImageIndex =>
      (currentImageIndex + 1) % pictures.length
    )
  }

  return(
    <div className="room-slider-container">
      <ul className="room-slider">
        {pictures.map((picture, index) =>
          <Slide
            className={activeIndex===index ? "room-first-slide" : "room-placeholder-slide"}
            index={index}
            key={picture.fileName}
            picture={picture}
          />
        )}
      </ul>
      <Dots
        activeIndex={activeIndex}
        length={pictures.length}
      />
      <button
        className="button room-slider-next-btn"
        onClick={showNext}
      />
    </div>
  )
}


// TODO: use webp, and fallback images. Does not need different sizes...?
export const Slide = ({className, picture}) =>
  <li className={className}>
    <picture>
      <source
        media="(min-width: 640px)"
        srcSet={picture.SIZE_1024}
      />
      <source
        media="(min-width: 1024px)"
        srcSet={picture.SIZE_1440}
      />
      <img
        // TODO: Better alt text!
        alt={picture.fileName}
        src={picture.SIZE_640}
      />
    </picture>
  </li>


const Dots = ({length, activeIndex}) =>
  <div className="room-slider-dots">
    {Array.from({length}).map((_, i) =>
      <span
        className={`room-slider-dot ${activeIndex===i ?"active-slide": ""}`}
        key={i}
      >
        {"•"}
      </span>
    )}
  </div>