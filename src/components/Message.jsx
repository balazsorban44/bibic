import React, {Component, Fragment} from 'react'
import QueryString from 'query-string'
import { FormGroup, FormSection } from './Form'
import {PersonalDetail, Send} from './Form/inputs'
import { BackMenu } from './Menu';
import {toast, ToastContainer} from 'react-toastify'
import {translate, isQueryString} from "../utils/language"
import {valid} from '../utils/validate'
import {MESSAGES_REF, TIMESTAMP_DB} from '../lib/firebase'


export default class Message extends Component {

  state = {
    message: "",
    subject: "other",
    name: "",
    email: "",
    tel: ""
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.updateByURL(this.props.location.search)
  }

  componentWillReceiveProps({location: {search}}) {this.updateByURL(search)}

  updateByURL = queryString => {
    if (queryString) {
      queryString = QueryString.parse(queryString)
      Object.entries(queryString).forEach(([key, value]) => {
        key = translate(key)
        value = key === "subject" ? translate(value) : value
        
        this.setState({[key]: value})
      })
    }
  }


  update = (key, value) => {
    if (isQueryString(key)) {
      const {history, match: {url}} = this.props
      const search = QueryString.parse(history.location.search)
      search[translate(key)] = key === "subject" ? translate(value) : value
      history.push(url + "?" + QueryString.stringify(search))
    } else this.setState({[key]: value})
  }

  updateMessage = ({target: {value: message}}) => this.setState({message})

  handleTypeChange = ({target: {value}}) => this.update("subject", value)
  


  isValid = ({subject, name, email, tel, message}) => {
    const error =
    !valid.name(name) ? "Érvénytelen név" :
    !valid.subject(subject) ? "Érvénytelen téma" :
    !valid.email(email) ? "Érvénytelen e-mail cím" :
    !valid.tel(tel) ? "Érvénytelen telefonszám" :
    !valid.messageMin(message) ? "Túl rövid üzenet (legalább 60 karakter)." :
    false
  
  if (error) {
    toast.error(
      <p style={{padding: ".5rem", fontSize: "1.2rem"}}>{error}<br/>
        <span style={{fontSize: "1rem"}}>
          Technikai hiba? <a style={{color: "white", borderBottom: "1px solid white"}} href="mailto:hiba@bibicvedeghazak.hu">hiba@bibicvedeghazak.hu</a>
        </span>
      </p>, {
        autoClose: 5000
      })
    return false
  } else {
    return true
  }
  }

  handleSend = e => {
    e.preventDefault()
    if (this.isValid(this.state)) {
      const obj = {
        ...this.state,
        timestamp: TIMESTAMP_DB,
        handled: false
      }
      console.log(obj);
      
      MESSAGES_REF.push(obj).then(() => {
        toast.success(
          <p style={{padding: ".5rem", fontSize: "1.2rem"}}>Üzenet elküldve. <br/>
          <span style={{fontSize: "1rem"}}>
            Néhány másodperc múlva visszakerül a főoldalra. További kérdésével fordulhat:<br/>
            <a style={{color: "white"}} href="mailto:info@bibicvendeghazak.hu">info@bibicvendeghazak.hu</a><br/>
            <a style={{color: "white"}} href="tel:+36305785730">+36 30 578 5730</a>
          </span>
        </p>, {autoClose: 7500})
        
        setTimeout(() => this.props.history.push(""), 7500)
      })
      .catch(({code, message}) => {
        toast.error(
          <p style={{padding: ".5rem", fontSize: "1.2rem"}}>Hiba: {code} - {message}<br/>
            <span style={{fontSize: "1rem"}}>
              Ha a probléma tartósan fennáll, jelezze itt: <a href={`mailto:hiba@bibicvedeghazak.hu?subject=Hibajelentés (${code})&body=${message}`}>hiba@bibicvedeghazak.hu</a>
            </span>
          </p>, {autoClose: 10000})
      })
      
    }
  }

  render() {
    const {subject, message, name, email, tel} = this.state
    return (
      <Fragment>
        <ToastContainer 
          closeOnClick
          style={{position: "fixed", zIndex: 10001, bottom: 0}}
          position="bottom-center"
        />
        <BackMenu/>
        <form className="message-form" action="">

            <FormSection title="Személyi adatok">
              <FormGroup footnote="kötelező">
                <PersonalDetail hasFootnote
                  onChange={this.update}
                  label="teljes név"
                  name="name"
                  value={name}
                  placeholder="Kovács József"
                  errorMessage="Érvénytelen név!"
                  notification={toast.error}
                />
                <PersonalDetail hasFootnote
                  onChange={this.update}
                  label="e-mail cím"
                  name="email"
                  value={email}
                  placeholder="kovacs.jozsef@email.hu"
                  errorMessage="Érvénytelen e-mail cím!"
                  notification={toast.error}
                />
                <PersonalDetail hasFootnote
                  onChange={this.update}
                  label="telefonszám"
                  name="tel"
                  value={tel}
                  placeholder="+36-30-123-4567"
                  errorMessage="Érvénytelen telefonszám!"
                  notification={toast.error}
                />
              </FormGroup>
          </FormSection>
          <FormSection title="Az üzenet témája">
                <select onChange={this.handleTypeChange} value={subject} name="" id="">
                  <option value="eventHall">Rendezvényterem</option>
                  <option value="fullHouse">Teljes ház</option>
                  <option value="special">Külön ajánlat</option>
                  <option value="other">Egyéb</option>
                </select>
            <FormGroup>
              <textarea 
                name="message"
                rows="15"
                onChange={this.updateMessage}
                value={message}
                placeholder="Tisztelt Bíbic vendégházak! Érdeklődni szeretnék..."
                type="text"
              />
            </FormGroup>
          </FormSection>
          <Send onClick={this.handleSend}>
            Küldés
          </Send>
        </form>
      </Fragment>
    )
  }
}