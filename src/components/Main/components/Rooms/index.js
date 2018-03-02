import React, {Component} from 'react'
import { ROOMS_REF, ROOMS_PHOTOS_REF } from '../../../../lib/firebase'
import FadeThrough from 'react-fadethrough'

class Rooms extends Component {

  state = {
    rooms: null
  }

  componentDidMount() {
    ROOMS_REF.on('value', snap => {
      this.setState({rooms: snap.val()})
    })
  }

  renderRooms = () => {
    const {rooms} = this.state
    return rooms && Object.keys(rooms).map(roomId => {
      const {id, description, pictures} = rooms[roomId]
      return (
        <li key={id} className="room" id={`szoba-${id}`}>
          <div className="room-text">
            <h4>{id}</h4>
            <div className="room-text-body room-text-hidden">
              <p>
                {description}
              </p>
              <h5>7.000.-/fő/éj</h5>
              <h3 className="is-reserved">
              </h3>
            </div>
          </div>
          {pictures &&
            <div
              className="room-slider"
            >
              <FadeThrough 
              interval={Object.keys(pictures).length*1500}
              height="100%"
              >
                {Object.keys(pictures).map((picture, index) => (
                  <img
                    width="100%"
                    key={index} 
                    src={pictures[picture].resized}
                    alt={`Szoba ${id}, kép ${index}`}
                  />
                ))}
              </FadeThrough>
            </div>
          }
        </li>
    )})
  }

  render() {
    
    return (
      <section id="szobak">
        <h2>Szobák</h2>
        <ul>
          {this.renderRooms()}
        </ul>
      </section>
    )
  }
} 

export default Rooms