import React, {Component, Fragment} from 'react'
import QueryString from 'query-string'
import {FormGroup, FormSection, Send} from './shared/Form'
import {BackMenu} from './Menu'
import {toast, ToastContainer} from 'react-toastify'
import {translate, isQueryString} from "../utils/language"
import {valid} from '../utils/validate'
import {MESSAGES_REF, TIMESTAMP_DB} from '../lib/firebase'
import PersonalDetails from './ReservationForm/PersonalDetails'


const updateByURL = search => {
  const newState = {}
  Object
    .entries(QueryString.parse(search))
    .forEach(([key, value]) => {
      key = translate(key)
      value = key === "subject" ? translate(value) : value
      newState[key] = value
    })
  return newState
}


export default class Message extends Component {

  state = {
    message: "",
    subject: "other",
    name: "",
    email: "",
    tel: ""
  }


  static getDerivedStateFromProps = ({location: {search}}) => updateByURL(search)

  componentDidMount() {
    window.scrollTo(0, 0)
  }


  handleUpdate = (key, value) => {
    if (isQueryString(key)) {
      const {history, match: {url}} = this.props
      const search = QueryString.parse(history.location.search)
      search[translate(key)] = key === "subject" ? translate(value) : value
      history.push(`${url}?${QueryString.stringify(search)}`)
    } else this.setState({[key]: value})
  }

  updateMessage = ({target: {value: message}}) => this.setState({message})

  handleTypeChange = ({target: {value}}) => this.handleUpdate("subject", value)


  isValid = ({
    subject, name, email, tel, message
  }) => {
    const error =
      !valid.name(name) ? "Érvénytelen név" :
        !valid.subject(subject) ? "Érvénytelen téma" :
          !valid.email(email) ? "Érvénytelen e-mail cím" :
            !valid.tel(tel) ? "Érvénytelen telefonszám" :
              !valid.messageMin(message) ? "A gyorsabb/pontosabb kommunikáció érdekében az üzenet legalább 40 karaktert kell hogy tartalmazzon." :
                false

    if (error) {
      toast.error(
        <p style={{padding: ".5rem",
          fontSize: "1.2rem"}}
        >{error}<br />
          <span
            style={{fontSize: "1rem"}}
          >
            Technikai hiba?
            <a
              href="mailto:hiba@bibicvedeghazak.hu"
              style={{color: "white",
                borderBottom: "1px solid white"}}
            >hiba@bibicvedeghazak.hu</a>
          </span>
        </p>, {autoClose: 5000})
      return false
    } else {
      return true
    }
  }

  handleSend = e => {
    e.preventDefault()
    if (this.isValid(this.state)) {
      const obj = {...this.state,
        timestamp: TIMESTAMP_DB,
        handled: false}
      MESSAGES_REF.push(obj).then(() => {
        toast.success(
          <p style={{padding: ".5rem",
            fontSize: "1.2rem"}}
          >Üzenet elküldve. <br />
            <span
              style={{fontSize: "1rem"}}
            >
              Néhány másodperc múlva visszakerül a főoldalra.
              További kérdésével fordulhat:<br/>
              <a
                href="mailto:info@bibicvendeghazak.hu"
                style={{color: "white"}}
              >info@bibicvendeghazak.hu</a><br />
              <a
                href="tel:+36305785730"
                style={{color: "white"}}
              >+36 30 578 5730</a>
            </span>
          </p>, {autoClose: 7500})

        setTimeout(() => this.props.history.push(""), 7500)
      })
        .catch(({code, message}) => {
          toast.error(
            <p style={{padding: ".5rem",
              fontSize: "1.2rem"}}
            >Hiba: {code} - {message}<br />
              <span style={{fontSize: "1rem"}}>
                Ha a probléma tartósan fennáll, jelezze itt:
                <a
                  href={
                    `mailto:hiba@bibicvedeghazak.hu?subject=Hibajelentés (${code})&body=${message}`
                  }
                >hiba@bibicvedeghazak.hu</a>
              </span>
            </p>, {autoClose: 10000})
        })

    }
  }

  render() {
    const {subject, message, name} = this.state
    return (
      <Fragment>
        <ToastContainer
          closeOnClick
          position="bottom-center"
          style={{position: "fixed",
            zIndex: 10001,
            bottom: 0}}
        />
        <BackMenu />
        <form
          action=""
          className="message-form"
        >

          <FormSection title="Személyi adatok">
            <PersonalDetails
              errorMessage="Érvénytelen név!"
              hasFootnote
              label="teljes név"
              name="name"
              notification={toast.error}
              onChange={this.handleUpdate}
              placeholder="Kovács József"
              value={name}
            />
          </FormSection>
          <FormSection title="Az üzenet témája">
            <select
              id=""
              name=""
              onChange={this.handleTypeChange}
              value={subject}
            >
              <option value="eventHall">Rendezvényterem</option>
              <option value="fullHouse">Teljes ház</option>
              <option value="special">Külön ajánlat</option>
              <option value="other">Egyéb</option>
            </select>
            <FormGroup>
              <textarea
                name="message"
                onChange={this.handleUpdateMessage}
                placeholder="Tisztelt Bíbic vendégházak! Érdeklődni szeretnék..."
                rows="15"
                type="text"
                value={message}
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