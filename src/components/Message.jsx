import React, {Component, Fragment} from 'react'
import QueryString from 'query-string'
import {
  FormGroup, FormSection, Send
} from './shared/Form'
import {BackMenu} from './Menu'
import {withStore} from './db'
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
    this.props.submitMessage()
  }

  render() {
    const {message, isMessageLoading} = this.props
    const {subject, content} = message

    return (
      <Fragment>
        <ToastContainer
          closeOnClick
          position="bottom-center"
          style={{
            position: "fixed",
            zIndex: 10001,
            bottom: 0
          }}
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
        <Send
          isMessageLoading={isMessageLoading}
          onClick={this.handleSend}
        >Küldés</Send>
      </form>
      </Fragment>
    )
  }
}
export default withStore(Message)