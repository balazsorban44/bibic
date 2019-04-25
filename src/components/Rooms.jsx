import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Loading} from 'components/shared/Elements'
import {UNSAFE_withStore} from "db"
import Fade from "react-reveal/Fade"
import { useTranslation } from 'react-i18next';

export const Rooms = ({
  galleries, rooms, roomServices
}) => {
  const [t] = useTranslation("rooms")
  
  return (
    <section id="szobak">
      <h2 data-subtitle={t("subtitle")}>{t("title")}</h2>
      <ul className="rooms">
        {rooms.length ? rooms.map(room =>
          <Fade key={room.id}>
            <Room
              pictures={galleries["szobak"] && galleries["szobak"][room.id]}
              services={roomServices}
              {...room}
              name={t("room", {roomNumber: room.id})}
            />
          </Fade>
        ) :
          <Loading fullPage/>
        }
      </ul>
    </section>
  )
}

export default UNSAFE_withStore(Rooms)

export const Room = ({
  id, name, description, pictures={}, services
}) => {
  
  const [t] = useTranslation("rooms")

  return (
    <li
      className={`room szoba-${id}`}
      id={`szoba-${id}`}
    >
      <h3 className="room-title" >{name}</h3>
      <RoomSlider pictures={Object.values(pictures)} />
      <p className="room-description" >{description}</p>
      <div className="room-services">
        {services.length ?
          services
            .filter(([_key, {inRoom}]) => Object.values(inRoom).includes(id))
            .map(([key, {name, icon}]) =>
              <img
                alt={name}
                className="room-service service-in-room"
                key={key}
                src={icon}
                title={name}
              />
            ) :
          <Loading/>
        }
      </div>
      <div className="button room-reserve-btn">
        <Link to={`foglalas?roomId=${id}`}>{t("reserve")}</Link>
      </div>
    </li>
  )
}


export class RoomSlider extends Component {
  static defaultProps = {delay: 10000, pictures: []}

  state = {activeIndex: 0, max: 0}

  componentDidMount() {
    const {delay, pictures} = this.props
    this.setState({max: pictures.length}, () => {
      this.interval = setInterval(this.handleTick, delay)
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleTick = () => {
    this.setState(({activeIndex: prevIndex}) => {
      const incrementedIndex = prevIndex + 1
      return ({activeIndex: incrementedIndex >= this.state.max ? 0 : incrementedIndex})
    })
  }

  render() {
    const {pictures} = this.props
    const {activeIndex, max} = this.state
    return(
      <div className="room-slider-container">
        <ul className="room-slider">
          {pictures
            .sort((a, b) => a.order - b.order)
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
          length={max}
        />
        <button
          className="button room-slider-next-btn"
          onClick={this.handleTick}
        />
      </div>
    )
  }
}

export const Slide = ({
  active, index, fileName, SIZE_640, SIZE_1024, SIZE_1440
}) =>
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
    {Array(length).fill().map((_e, i) =>
      <span
        children="•"
        className={
          `room-slider-dot ${activeIndex===i ?"active-slide": ""}`}
        key={i}
      />
    )}
  </div>