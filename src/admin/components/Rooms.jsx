import React, { Component } from 'react';
import * as firebase from 'firebase'

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.room.id,
      available: this.props.room.available
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    this.setState({
      id: this.props.room.id,
      available: this.props.room.available
    })
  }

  handleClick() {
    const dbRef = firebase.database()
    const roomRef = dbRef.ref(`rooms/${this.state.id}`)
    roomRef.set({
      id: this.state.id,
      available: !this.state.available
    })
    roomRef.on('value', snap => {
      this.setState({
        available: snap.val().available
      })
    })
  }


  render() {
    return (
      <li>
        <h4>Szoba {this.state.id}</h4>
        <div>
          <p>Megjelölés foglaltként:</p>
          <input
            type="checkbox"
            defaultChecked={!this.state.available && "checked"}
            onClick={this.handleClick}
          />
        </div>
      </li>
    )
  }
}

export default class Rooms extends Component {
  render() {
    const roomsList = []
    if (this.props.rooms.length !== 0) {
      this.props.rooms.forEach(room => {
        roomsList.push(<Room key={room.id} room={room}/>)
      })
    }
    return (
      <div className="rooms">
        <h3>Szobák lefoglalása</h3>
        <ul>
          {roomsList}
        </ul>
      </div>
    )
  }
}
