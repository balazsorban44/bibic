import React, {Component} from 'react'
import moment from "moment"
import Day from './Day'
import Navigation from './Navigation'
import {sendNotification} from '../../components/db/notification'


class Calendar extends Component {

  static defaultProps={
    disabled: [],
    min: null,
    arrowElement: "→"
  }

  state = {
    weeks: null,
    currentMonth: moment(),
    min: null,
    start: null,
    end: null,
    hoverStart: null,
    hoverEnd: null,
    startOffset: null,
    endOffset: null,
    shouldUpdate: false
  }

  componentDidMount() {
    this.getWeeks()
  }

  componentDidUpdate = (_prevProps, {
    start: prevStart, end: prevEnd, currentMonth: prevCurrentMonth
  }) => {
    const {
      onChange, min,
      range: {
        start: newStart, end: newEnd
      }
    } = this.props


    const {
      currentMonth, start: currentStart, end: currentEnd
    } = this.state

    if (!prevCurrentMonth.isSame(currentMonth, "month")) this.getWeeks()
    if (min && !this.state.min) this.setState({min})
    if (this.state.shouldUpdate) {
      onChange(currentStart, currentEnd)
      this.setState({shouldUpdate: false})
    }

    if (newStart && newEnd && !prevStart && !prevEnd) {
      this.setState({
        start: moment(newStart),
        end: moment(newEnd),
        currentMonth: moment(newStart)
      })
    }


  }

  getWeeks = () => {
    const {currentMonth: month} = this.state
    const startOffset = month.clone().startOf("month").day()
    const endOffset = 42 - month.clone().endOf("month").date() - startOffset
    this.setState({
      weeks: moment.range(
        month.clone().startOf("month").add(-startOffset, "day"),
        month.clone().endOf("month").add(endOffset, "day")
      ),
      startOffset,
      endOffset
    })
  }

  handleMonthChange = direction => {
    this.setState(
      ({currentMonth}) => ({currentMonth: direction===0 ?
        moment() :
        currentMonth.clone().add(direction, "month")}
      )
    )
  }

  resetHover = () =>
    this.setState({
      hoverStart: null,
      hoverEnd: null
    })


  handleDayHover = day => {
    const {
      start, end
    } = this.state
    const {disabled} = this.props
    if (start && !end) {
      // Normal hover
      if (start.isBefore(day, "day")) {
        this.setState({hoverStart: start})
        const hoverRange = moment.range(start, day).snapTo("day")
        const overlap = disabled.find(overlap =>
          hoverRange.overlaps(overlap) &&
          start.clone().startOf("day").isBefore(overlap.start) &&
          hoverRange.end.isAfter(overlap.start)
        )
        this.setState({hoverEnd: overlap ? overlap.start : day})
      } else {
        // Reverse hover
        this.setState({hoverEnd: start})
        const hoverRange = moment.range(day, start).snapTo("day")
        const overlap = disabled.reverse()
          .find(overlap =>
            hoverRange.overlaps(overlap) &&
            day.clone().startOf("day").isBefore(overlap.start) &&
            hoverRange.end.isAfter(overlap.end)
          )
        this.setState({hoverStart: overlap ? overlap.end : day})
      }
    }
  }

  handleDayChange = day => {
    const {
      start, end, hoverStart, hoverEnd
    } = this.state
    if ((start && end) || (!start && !end)) {
      this.setState({
        start: day,
        end: null
      })
    } else {

      if (!hoverStart || (hoverStart.diff(hoverEnd) >= 0)) {
        sendNotification("sameDay")
        return
      }
      this.setState(() => ({
        start: hoverStart,
        end: hoverEnd
      }), () => {
        const {
          start, end
        } = this.state
        this.resetHover()
        this.props.onChange(start, end)
        sendNotification("calendarSelectSuccess")
      })
    }
  }

  render() {
    const {
      weeks, currentMonth, min, start, end, hoverStart, hoverEnd
    } = this.state
    const {
      style,
      navigationStyle, navigationIconStyle, navigationIcon,
      monthStyle, dayStyle, bottomNavigation, disabled
    } = this.props

    const hoverRange = moment.range(hoverStart, hoverEnd)
    const monthStart = currentMonth.clone().startOf("month")
    const monthEnd = currentMonth.clone().endOf("month")
    return (
      <div
        style={{
          fontFamily: "monospace",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...style
        }}
      >
        <Navigation
          icon={navigationIcon}
          iconStyle={navigationIconStyle}
          min={min}
          month={currentMonth}
          onNavigation={this.handleMonthChange}
          style={{
            ...navigationStyle,
            order: bottomNavigation ? 1 : 0
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(48px, 1fr))",
            gridTemplateRows: 48,
            gridAutoRows: 48,
            overflow: "auto",
            ...monthStyle
          }}
        >
          {weeks &&
            Array.from(weeks.by('day'))
              .map((day, index) => {
                let periodStart = false
                let periodEnd = false
                day.hours(15)
                let isDisabled = disabled.some(period => {
                  if (day.isSame(period.start, "day")) periodStart = true
                  if (day.isSame(period.end, "day")) periodEnd = true
                  return period.contains(day)
                })
                if (periodStart) {
                  isDisabled = periodEnd
                }
                const placeholder =
                  day.isBefore(monthStart, "month") ||
                  day.isAfter(monthEnd, "month")
                const hovered = (hoverStart && hoverEnd && hoverRange.contains(day))
                const isStart = (day.isSame(start, "day") && !hoverRange.end.isSame(start, "day")) || day.isSame(hoverRange.start, "day")
                const isEnd = day.isSame(end, "day") || day.isSame(hoverRange.end, "day")
                const selected = isStart || isEnd ||
                  (day.isAfter(start, "day") &&
                   day.isBefore(end, "day"))
                const selectable = day.isAfter(min)
                return (
                  <Day
                    disabled={isDisabled}
                    key={index}
                    onDayChange={this.handleDayChange}
                    onDayHover={this.handleDayHover}
                    style={dayStyle}
                    value={day}
                    {...{
                      isStart,
                      isEnd,
                      hovered,
                      placeholder,
                      selectable,
                      selected
                    }}
                  />
                )
              }
              )
          }
        </div>

      </div>
    )
  }
}

export default Calendar