import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { ROOMS_REF } from '../../lib/firebase'
import { Loading } from '../shared/Elements';

class Rooms extends Component {

  state = {
    rooms: []
  }

  componentDidMount() {
    ROOMS_REF.on('value', snap => {this.setState({rooms: Object.values(snap.val())})})
    // ROOMS_REF.child("0").on('value', snap => {this.setState({rooms: [snap.val()]})})
  
    this.handleResize()
    window.addEventListener("resize", this.handleResize, false)
  }

  componentWillUnmount() {window.removeEventListener("resize", this.handleResize, false)}

  handleResize = () => this.setState({isSmallScreen: window.innerWidth < 768})

  render() {
    const {rooms, isSmallScreen} = this.state
    return (
      <section id="szobak">
        <h2>Szobák</h2>
        <ul className="rooms">
          {rooms.length ? rooms.map((room, key) =>
            <Room {...{key, ...room}}/>   
          ) :
            <Loading/>
          }
        </ul>
      </section>
    )
  }
} 

export default Rooms

class Room extends Component {
  render() {
    const {available, id, name, description, pictures} = this.props
    return (
      <li id={`szoba-${id}`} className={`room szoba-${id}`}>
        <h3 className="room-title" >{name}</h3>
        <RoomSlider {...{pictures}} />
        <p className="room-description" >{description}</p>
        <div className={`button room-reserve-btn ${!available ? "room-unavailable-reserve-btn" : ""}`}>
          {available ? 
            <Link to={`foglalas?szoba=${id}`}>Lefoglalom</Link> :
            <p>Lefoglalom</p>
          }
        </div>
      </li>
    ) 
  }
}

class RoomSlider extends Component {

  state = {
    positionX: 0,
    shouldSnap: false,
    activeSlideIndex: 0,
    intervalId: null
  }


  componentDidMount() {this.setTicker()}

  componentWillUnmount() {this.clearTicker()}


  ticker = () => this.nextSlide()
  setTicker = () => this.setState({intervalId: setInterval(this.ticker, 5000)})
  clearTicker = () => clearInterval(this.state.intervalId)



  handleTouchStart = e => {
    this.clearTicker()
    const {positionX} = this.state
    const width = window.innerWidth
    this.setState({
      startX: positionX === width ? width : e.touches[0].pageX,
      shouldSnap: false
    })
  }
  
  handleTouchEnd = () => {
    const {positionX} = this.state
    const width = window.innerWidth 
    this.setState({
      positionX: positionX > width/3 ? width : 0,
      shouldSnap: true
    }, () => this.state.positionX !== 0 && this.nextSlide())
    this.setTicker()
  }
  
  handleTouch = e => {
    this.setState({positionX: this.state.startX-e.touches[0].pageX})
  }

  nextSlide = e => {
    this.clearTicker()
    this.setState(({activeSlideIndex: prevIndex}) => ({
        activeSlideIndex: prevIndex+1 >= Object.keys(this.props.pictures).length ? 0 : prevIndex+1
    }), this.setTicker)
  }

  render() {
    const {pictures} = this.props
    const {positionX, shouldSnap, activeSlideIndex} = this.state
    
    return(
      <div className="room-slider-container">
        <ul className="room-slider"
            // onTouchStart={this.handleTouchStart}
            // onTouchEnd={this.handleTouchEnd}
            // onTouchMove={this.handleTouch}
        >
          {Object.entries(pictures).map(([key, {name: alt, resized: src}], index) => {
            const isFirst = index === activeSlideIndex
            return (
              <li {...{key}}
                onMouseEnter={this.clearTicker}
                onMouseLeave={this.setTicker}
                className={!isFirst ? "room-placeholder-slide" : "room-first-slide"}
                style={{zIndex: isFirst ? 99 : 10-index}}
              >
                <Slide {...{alt, src}}
                  style={{
                    transform: isFirst ? `translateX(${-positionX}px)` : "none",
                    transition: (isFirst && shouldSnap) ? ".625s" : "0s"
                  }} 
                />
              </li>
            )
          }
          )}
        </ul>
        <div className="room-slider-indexes">
          {Object.keys(pictures).map((key, index) => 
            <span {...{key}} 
              className={`room-slider-index ${activeSlideIndex===index ? "active-slide": ""}`}
            >•</span>
          )}
        </div>
        <div onClick={this.nextSlide} className="button room-slider-next-btn"/>
      </div>
    )
  }
}

const Slide = props => <img {...{...props}}/>