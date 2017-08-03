import React, { Component } from 'react'
import '../admin.css'
// import logoBrown from './logo-brown.png'
import * as firebase from 'firebase'
import Login from './Login'
import Rooms from './Rooms'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      name: "admin",
      isLoggedIn: false,
      rooms: []
    }
    this.resetRooms = this.resetRooms.bind(this)

  }

  resetRooms() {
    this.setState({
      rooms: []
    })
  }

  componentDidMount() {
    const auth = firebase.auth()
    auth.onAuthStateChanged(firebaseUser => {

        if (firebaseUser) {
          const dbRef = firebase.database()
          const roomsRef = dbRef.ref('rooms')
          const adminRef = dbRef.ref('admins')
          adminRef.once('value', snap => {
            this.setState({
              name: snap.val()[firebaseUser.uid].name,
              isLoggedIn:true
            })
          })
          roomsRef.once('value', snap => {
            for (let value in snap.val()) {
              const room = {
                id: snap.val()[value].id,
                available: snap.val()[value].available
              }
              if (room.id !== undefined) {
                this.setState({
                  rooms: this.state.rooms.concat(room)
                })
              }
            }
          })
          document.querySelector('#logout-form').classList.remove('hide')
          document.querySelector('#login-form').classList.add('hide')
          console.log(`Bejelentkezve ${firebaseUser.email} e-mail címmel`)
        } else {
          this.setState({isLoggedIn:false})
          document.querySelector('#login-form').classList.remove('hide')
          document.querySelector('#logout-form').classList.add('hide')
          console.log(`Nincs bejelentkezve.`);
        }
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Admin kezelőfelület</h2>
          <Login name={this.state.name} resetRooms={this.resetRooms}/>
        </header>
        {this.state.isLoggedIn ?
          <Rooms rooms={this.state.rooms}/> :
          <div className='not-logged-in'>
            {/* <img src={logoBrown} alt="Nincs jogosultsága."/> */}
            <h3>Nincs bejelentkezve.</h3>
          </div>
        }
        <footer>
          <ul>
            <li><a href="http://balazsorban.com/bibic-vendeghazak">Bíbic vendégházak</a></li>
            <li><a href="mailto:info@balazsorban.com">info@balazsorban.com</a></li>
          </ul>
        </footer>
      </div>
    );
  }
}
