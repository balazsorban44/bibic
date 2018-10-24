import React, {Component} from 'react'
import {withStore} from '../db'
import {FormSection, Send} from '../shared/Form'
import {toPrice} from '../../utils/language'
import RoomSelector from './RoomSelector'
import RoomServices from './RoomServices'
import PersonalDetails from '../shared/PersonalDetails'
import ReservationDetails from './ReservationDetails'
import Footnote from './Footnote'


class ReservationForm extends Component {

  componentDidMount() {window.scrollTo(0, 0)}

  handleSubmitReservation = e => {
    e.preventDefault()
    this.props.submitReservation()
  }

  render() {
    const {
      reservation: {price, ...reservation}, isReserving, updateReservation
    } = this.props
    return(

      <form
        action=""
        className="form"
      >
        <h2>Foglalás</h2>
        <RoomSelector/>
        <RoomServices/>
        <FormSection title="Személyi adatok">
          <PersonalDetails
            footnote="(számla kiállításához szükséges adatok)"
            onChange={updateReservation}
            personalDetails={reservation}
          />
        </FormSection>
        <FormSection title="Foglalás adatai">
          <ReservationDetails/>
        </FormSection>
        <Send
          isLoading={isReserving}
          onClick={this.handleSubmitReservation}
        >
            Küldés
          <span className="footnote-asterix">
            {toPrice(price)}
          </span>
        </Send>
        <Footnote/>
      </form>
    )
  }
}

export default withStore(ReservationForm)