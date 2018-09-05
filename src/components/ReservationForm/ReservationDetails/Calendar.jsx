import React, {Fragment} from 'react'
import moment from "moment"
import Calendar from "react-daterange-picker"
import {Date as DateLabel} from '../../shared/Form'
import {toast} from "react-toastify"
import {withStore} from '../../db'


const ReservationCalendar = ({
  reservation: {
    from, to
  }, overlaps, tomorrow, month, handleDateSelect, handleMonthChange
}) => {
  return (
    <Fragment>
      <DateLabel
        hasFootnote
        label="érkezés"
        name="from"
        notification={toast.warning}
        value={from}
      />
      <DateLabel
        hasFootnote
        label="távozás"
        name="to"
        notification={toast.warning}
        value={to}
      />
      <Calendar
        dateStates={Array.isArray(overlaps) ?
          overlaps
            .map(day => ({
              state: "unavailable",
              range: moment.range(moment(day), moment(day))
            })): []}
        firstOfWeek={1}
        min={moment(month).month() === moment().month() ? tomorrow : null}
        numberOfMonths={window.innerWidth < 640 ? 1 : 2}
        onSelect={handleDateSelect}
        paginationArrowComponent={props =>
          <PaginationArrow
            onMonthChange={handleMonthChange}
            {...props}
          />
        }
        selectedLabel="Kiválasztva"
        value={moment.range(from, to)}
      />
      <span className="calendar-legend">
        <ul>
          <li>Kiválasztva</li>
          <li>Nem elérhető</li>
        </ul>
      </span>
    </Fragment>
  )
}

export default withStore(ReservationCalendar)


const PaginationArrow = ({
  disabled, direction, onTrigger, onMonthChange
}) =>

  <span
    className={`DateRangePicker__PaginationArrow DateRangePicker__PaginationArrow--${direction}`}
    onClick={() => {
      direction === "next" ?
        onMonthChange(1) :
        onMonthChange(-1, disabled)
      onTrigger()
    }}
  >
    {direction === "next" ? "►" : "◄"}
  </span>