import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Loading} from './shared/Elements'
import {withStore} from "./db"
import Fade from "react-reveal/Fade"

const Rooms = ({
  galleries, rooms, roomServices
}) =>
  <section id="szobak">
    <h2>Szobák</h2>
    <ul className="rooms">
      {rooms.length ? rooms.map((room, key) =>
        <Fade
          key={key}
          up
        >
          <Room
            pictures={galleries["szobak"] ? galleries["szobak"][key] : []}
            services={roomServices}
            {...room}
          />
        </Fade>
      ) :
        <Loading fullPage/>
      }
    </ul>
  </section>

export default withStore(Rooms)

const Room = ({
  id, name, description, pictures, services
}) =>
  <li
    className={`room szoba-${id}`}
    id={`szoba-${id}`}
  >
    <h3 className="room-title" >{name}</h3>
    <RoomSlider {...{pictures}} />
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
      <Link to={`foglalas?szoba=${id}`}>Lefoglalom</Link>
    </div>
  </li>


class RoomSlider extends Component {

  state = {
    positionX: 0,
    shouldSnap: false,
    activeSlideIndex: 0,
    intervalId: null
  }


  componentDidMount() {this.setTicker()}

  componentWillUnmount() {this.clearTicker()}


  ticker = () => this.handleSlide()

  setTicker = () => this.setState({intervalId: setInterval(this.ticker, 10000)})

  clearTicker = () => clearInterval(this.state.intervalId)


  handleTouchStart = e => {
    this.clearTicker()
    const {positionX} = this.state
    const width = window.innerWidth
    this.setState({startX: positionX === width ? width : e.touches[0].pageX,
      shouldSnap: false})
  }

  handleTouchEnd = () => {
    const {positionX} = this.state
    const width = window.innerWidth
    this.setState({positionX: positionX > width/3 ? width : 0,
      shouldSnap: true}, () => this.state.positionX !== 0 && this.handleSlide())
    this.setTicker()
  }

  handleTouch = e => {
    this.setState({positionX: this.state.startX-e.touches[0].pageX})
  }

  handleSlide = _e => {
    this.clearTicker()
    this.setState(({activeSlideIndex: prevIndex}) =>
      ({activeSlideIndex: prevIndex+1 >= Object.keys(this.props.pictures).length ? 0 : prevIndex+1})
    , this.setTicker
    )
  }

  render() {
    const {pictures} = this.props
    const {
      positionX, shouldSnap, activeSlideIndex
    } = this.state

    return(
      <div className="room-slider-container">
        <ul className="room-slider">
          {Object.entries(pictures)
            .sort((a, b) => a[1].order - b[1].order)
            .map(([key, picture], index) => {
              const isFirst = index === activeSlideIndex
              return (
                <li
                  {...{key}}
                  /*
                   * onMouseEnter={this.clearTicker}
                   * onMouseLeave={this.setTicker}
                   */
                  className={!isFirst ? "room-placeholder-slide" : "room-first-slide"}
                  style={{zIndex: isFirst ? 99 : 10-index}}
                >
                  <Slide
                    {...{picture}}
                    style={{transform: isFirst ? `translateX(${-positionX}px)` : "none",
                      transition: (isFirst && shouldSnap) ? ".625s" : "0s"}}
                  />
                </li>
              )
            }
            )}
        </ul>
        <div className="room-slider-dots">
          {pictures && Object.keys(pictures).map((key, index) =>
            <span
              {...{key}}
              className={`room-slider-dot ${activeSlideIndex===index ? "active-slide": ""}`}
            >•</span>
          )}
        </div>
        <div
          className="button room-slider-next-btn"
          onClick={this.handleSlide}
        />
      </div>
    )
  }
}

const Slide = ({picture: {
  fileName, SIZE_768, SIZE_1280, SIZE_1440
}}) =>
  <picture>
    <source
      media="(min-width: 768px)"
      srcSet={SIZE_1280}
    />
    <source
      media="(min-width: 1024px)"
      srcSet={SIZE_1440}
    />
    <img
      alt={fileName}
      src={SIZE_768}
    />
  </picture>