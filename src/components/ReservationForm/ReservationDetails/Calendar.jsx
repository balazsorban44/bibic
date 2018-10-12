import React, {Component} from 'react'
import moment from 'moment'
import {withStore} from '../../db'
import {colors} from '../../../utils/colors'
import {sendNotification} from '../../db/notification'
import {Loading} from '../../shared/Elements'
import {Date as DateLabel} from '../../shared/Form'
import {TODAY} from '../../../utils/constants'

/**
 *  NOTE: Awating implementation
 * @see https://github.com/Adphorus/react-date-range/pull/246
 * import hu from "react-date-range/dist/locale/hu"
 */


class Calendar extends Component {

  state = {DateRangePicker: null}

  async componentDidMount() {
    const {fetchOverlaps, reservation: {roomId}} = this.props
    fetchOverlaps(roomId)
    try {
      const {DateRangePicker} = await import("react-date-range")
      await import('react-date-range/dist/theme/default.css')
      this.setState({DateRangePicker})
    } catch(error) {
      sendNotification(error.message)
    }
  }

  componentDidUpdate = ({reservation: {roomId: prevRoomId}}) => {
    const {reservation: {roomId}, fetchOverlaps} = this.props
    if (prevRoomId !== roomId)
      fetchOverlaps(roomId)
  }

  handleSelect = ({selection: {startDate, endDate}}) => {
    const {updateReservation} = this.props
    updateReservation("from", moment(startDate).format("YYYY-MM-DD"))
    updateReservation("to", moment(endDate).format("YYYY-MM-DD"))
    sendNotification("calendarSelectSuccess")
  }

  render() {
    const {DateRangePicker} = this.state
    const {reservation: {
      roomId, from, to
    }, rooms} = this.props
    let {overlaps} = this.props
    const unavailable = rooms && rooms[roomId-1] && rooms[roomId-1].unavailable
    const disabled = overlaps
    if (unavailable) disabled.push(moment.range(TODAY, moment(new Date(unavailable))))

    const selected = {
      startDate: from,
      endDate: to,
      key: 'selection',
      color: colors.accent.primary
    }

    overlaps = overlaps
      .map(overlap => Array.from(overlap.by("day")))
      .reduce((acc, val) => acc.concat(val), [])
      .map(day => day.toDate())

    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1
      }}
      >
        <div
          style={{display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"}}
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
        </div>
        {DateRangePicker ?
          <DateRangePicker
            //locale={hu}
            direction="vertical"
            disabledDates={overlaps}
            inputRanges={[]}
            minDate={moment().add(1, "day").startOf("day").toDate()}
            onChange={this.handleSelect}
            ranges={[selected]}
            staticRanges={[]}
          /> :
          <Loading/>
        }
      </div>
    )
  }
}

export default withStore(Calendar)