import React, {Component} from 'react'
import { ROOMS_REF } from '../../../lib/firebase'
import Slider from 'react-slick'

class Rooms extends Component {

  state = {
    rooms: null
  }

  componentDidMount() {
    ROOMS_REF.on('value', snap => {
      this.setState({rooms: snap.val()})
    })
    this.handleResize()
    window.addEventListener("resize", this.handleResize, false)
  }

  handleRoomClick = id => {
    console.log(id);
  }

  handleResize = () => {
    this.setState({
      isSmallScreen: window.innerWidth < 768
    })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize, false)
  }


  render() {
    const {rooms, isSmallScreen} = this.state
    
    return (
      <section id="szobak">
        <h2>Szobák</h2>
        <ul className="rooms">
          {rooms && Object.keys(rooms).map(roomId => {
            const {id, pictures} = rooms[roomId]
            return (
              <li key={id} className="room" id={`szoba-${id}`}>
                <button onClick={() => this.handleRoomClick(id)}>
                  {id}
                </button>
                <Slider fade
                  className="room-slider"
                  arrows={false}
                  lazyLoad={isSmallScreen}
                  autoplay autoplaySpeed={3000}
                  speed={1000}
                >
                  {Object.keys(pictures).map((picture, index) => (
                    <img
                      key={index} 
                      src={pictures[picture].resized}
                      alt={`Szoba ${id}, kép ${index}`}
                    />
                  ))}
                </Slider>
              </li>
            )}
          )}
        </ul>
      </section>
    )
  }
} 

export default Rooms