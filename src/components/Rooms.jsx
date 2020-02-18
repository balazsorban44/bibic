import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Loading} from './shared/Elements'
import {useStore} from "./db"
import Fade from "react-reveal/Fade"
import {useTranslation} from 'react-i18next'
import {useGallery} from 'context/gallery'

export const Rooms = () => {
  const [t] = useTranslation()
  const {rooms, roomServices} = useStore()
  const {getGallery} = useGallery()

  const pictures = getGallery("rooms")
    .reduce((acc, picture) => {
      if (picture.roomId in acc) {
        acc[picture.roomId].push(picture)
      } else {
        acc[picture.roomId] = [picture]
      }
      return acc
    }, {})

  return (
    <section id="szobak">
      <h2>{t("rooms.title")} <span>{t("rooms.subtitle")}</span></h2>
      <ul className="rooms">
        {rooms.length ? rooms.map(room =>
          <Fade key={room.id}>
            <Room
              pictures={pictures?.[room.id] ?? []}
              services={roomServices}
              {...room}
            />
          </Fade>
        ) :
          <Loading fullPage/>
        }
      </ul>
    </section>
  )
}

export default Rooms

export const Room = ({id, description, pictures, services}) => {
  const [t] = useTranslation()
  const name = t("room", {id})
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
  static defaultProps = {pictures: []}

  state = {activeIndex: 0, max: 0}

  componentDidMount() {
    this.setState({max: this.props.pictures.length})
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval)
  // }

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