import React, {Component} from 'react'
import Calendar from '../../../lib/Calendar'
import moment from 'moment'
import {withStore} from '../../db'
import {toast} from "react-toastify"
import {Date as DateLabel} from '../../shared/Form'
import Arrow from "../../../assets/icons/arrow_thick.svg"
import {colors} from '../../../utils/colors'
import {sendNotification} from '../../db/notification'

class DateRangePicker extends Component {
  state = {overlaps: []}

  componentDidUpdate = ({reservation: {roomId: prevRoomId}}) => {
    const {roomId} = this.props.reservation
    if (prevRoomId !== roomId) this.fetchOverlaps(roomId)
  }

  handleDateChange = (start, end) => {
    this.props.updateReservation("from", start.format("YYYY-MM-DD"))
    this.props.updateReservation("to", end.format("YYYY-MM-DD"))
  }

  fetchOverlaps = roomId =>
    fetch(`https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net/getOverlaps?roomId=${roomId}`)
      .then(res => res.json())
      .then(newOverlaps => this.setState({overlaps:
        newOverlaps
          .map(({
            start, end
          }) => moment.range(start, end))})
      ).catch(e => toast.error(`Hiba: ${e.message}. Ha ez a hiba tartósan fennáll, kérjük vegye fel velünk a kapcsolatot.`, {hideProgressBar: true}))

  render() {
    const {overlaps} = this.state
    const {
      reservation: {
        roomId, from, to
      }, rooms
    } = this.props
    const unavailable = rooms && rooms[roomId-1] && rooms[roomId-1].unavailable
    const disabled = overlaps
    if (unavailable) disabled.push(moment.range(moment(), moment(new Date(unavailable))))

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, auto))",
          margin: "1em",
          flex: 1,
          gridGap: "1em"
        }}
      >
        <DateLabel
          hasFootnote
          label="érkezés"
          name="from"
          notification={sendNotification}
          value={from}
        />
        <DateLabel
          hasFootnote
          label="távozás"
          name="to"
          notification={sendNotification}
          value={to}
        />
        <Calendar
          bottomNavigation
          disabled={disabled}
          min={moment()}
          monthStyle={{
            backgroundColor: "#fff",
            overflow: "hidden"
          }}
          navigationIcon={Arrow}
          navigationIconStyle={{
            position: "relative",
            width: 24,
            height: 24,
            padding: 8,
            display: "grid",
            placeItems: "center",
            backgroundColor: colors.accent.primary,
            borderRadius: "50%",
            color: "#fff",
            fontSize: "1.2em"
          }}
          navigationStyle={{
            backgroundColor: "rgba(0,0,0,.05)",
            marginBottom: ".5em"
          }}
          notification={sendNotification}
          onChange={this.handleDateChange}
          range={{
            start: from,
            end: to
          }}
          style={{
            gridColumn: "1 / -1",
            justifySelf: "start",
            borderBottom: "2px solid black",
            fontFamily: "Coolvetica",
            fontSize: "90%",
            letterSpacing: 1.1
          }}
        />
      </div>
    )
  }
}

export default withStore(DateRangePicker)