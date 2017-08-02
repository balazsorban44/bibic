import React, { Component } from 'react'
import * as firebase from 'firebase'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      name: "admin"
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentWillReceiveProps() {
    this.setState({
      name: this.props.name
    })
  }
  handleLogin() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(e => console.log(e.message))
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }


  handleLogout(){
    this.props.resetRooms();
    firebase.auth().signOut()
    console.log('Kijelentkezve.');
  }

  render() {
    return (
      <div id="login-wrapper">
        <div id="login-form">
          <label>
            E-mail:
          </label>
          <input onChange={this.handleEmailChange}
            type="email"
            placeholder="admin@admin.hu"
          />
          <label>
            Jelszó:
          </label>
          <input onChange={this.handlePasswordChange}
            type="password"
            placeholder="******"
          />
          <button onClick={this.handleLogin}>Bejelentkezés</button>
        </div>
        <div id="logout-form" className="hide">
          <h3><span>{this.state.name}</span> bejelentkezve.</h3>
          <button id="logout-btn" onClick={this.handleLogout}>Kijelentkezés</button>
        </div>
      </div>
    )
  }
}
