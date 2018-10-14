import React, {Component} from 'react'
import {
  FormGroup, FormSection, Send
} from './shared/Form'
import PersonalDetails from './shared/PersonalDetails'
import {withStore} from './db'


class Message extends Component {

  componentDidMount() {window.scrollTo(0, 0)}

  handleChange = this.props.updateMessage

  handleUpdate = ({target: {name, value}}) => this.handleChange(name, value)

  handleSend = e => {
    e.preventDefault()
    this.props.submitMessage()
  }

  render() {
    const {message, isMessageLoading} = this.props
    const {subject, content} = message

    return (
      <form
        action=""
        className="form message-form"
      >
        <FormSection title="Személyi adatok">
          <PersonalDetails
            disabled={isMessageLoading}
            onChange={this.handleChange}
            personalDetails={message}
          />
        </FormSection>
        <FormSection title="Üzenet részletei">
          <FormGroup title="Az üzenet témája">
            <select
              disabled={isMessageLoading}
              id=""
              name="subject"
              onChange={this.handleUpdate}
              value={subject}
            >
              <option value="eventHall">Rendezvényterem</option>
              <option value="fullHouse">Teljes ház</option>
              <option value="special">Külön ajánlat</option>
              <option value="other">Egyéb</option>
            </select>
          </FormGroup>
          <FormGroup
            className="message"
            title="Az üzenet tartalma"
          >
            <textarea
              disabled={isMessageLoading}
              name="content"
              onChange={this.handleUpdate}
              placeholder="Tisztelt Bíbic vendégházak... (min. 40 karakter)"
              rows="8"
              type="text"
              value={content}
            />
          </FormGroup>
        </FormSection>
        <Send
          isMessageLoading={isMessageLoading}
          onClick={this.handleSend}
        >Küldés</Send>
      </form>
    )
  }
}

export default withStore(Message)