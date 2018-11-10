import React, {Component} from 'react'
import moment from 'moment'
import {withStore} from '../../db'
import {colors} from '../../../utils/colors'
import {sendNotification} from '../../db/notification'
import {Loading} from '../../shared/Elements'
import {Date as DateLabel} from '../../shared/Form'
import {TOMORROW} from '../../../utils/constants'

/*
 *  NOTE: Implemented locally
 * @see https://github.com/Adphorus/react-date-range/pull/246
 */

import hu from "../../../lib/react-date-range/locale/hu"


class Calendar extends Component {

  state = {DateRangePicker: null}

  async componentDidMount() {
    const {fetchOverlaps, reservation: {roomId}} = this.props
    fetchOverlaps(roomId)
    try {
      const {DateRangePicker} = await import("../../../lib/react-date-range")
      await import('../../../lib/react-date-range/theme/default.css')
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
    const {reservation: {from, to}} = this.props
    let {overlaps} = this.props

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
            direction="vertical"
            disabledDates={overlaps}
            inputRanges={[]}
            locale={hu}
            minDate={TOMORROW.clone().toDate()}
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