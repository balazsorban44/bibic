import React, {useEffect, useState} from 'react'
import {useNotification} from 'lib/notification'
import {colors} from 'utils/colors'
import {Date as DateInput} from 'components/Form'
import {TOMORROW} from 'utils/env'
import {DateRangePicker} from "@balazsorban/react-date-range"
import '@balazsorban/react-date-range/dist/theme/default.css'
import {eachDayOfInterval, endOfDay, subDays} from 'date-fns'
import {useLocale} from 'utils/i18n'
import config from 'utils/env'


export const useOverlaps = (roomId) => {

  const [overlaps, setOverlaps] = useState([])

  const notify = useNotification()
  useEffect(() => {
    (async() => {
      try {
        if (!roomId) {
          return
        }
        const url = new URL("getOverlaps", config.firebase.CLOUD_FUNCTION_URL)
        url.searchParams.append("roomId", roomId)
        const overlaps = await (await fetch(url.toString())).json()

        const reduceToOverlapsList = (acc, {start, end}) => [
          ...acc,
          ...eachDayOfInterval({start: new Date(start), end: endOfDay(subDays(new Date(end), 1))})
        ]
        setOverlaps(overlaps.reduce(reduceToOverlapsList, []))
      } catch (error) {
        notify({type: "error", content: error.message})
      }
    })()
  }, [notify, roomId])

  return overlaps
}

const Calendar = ({roomId, from, to, onChange}) => {

  const overlaps = useOverlaps(roomId)
  const notify = useNotification()

  const handleSelect = ({selection: {startDate: from, endDate: to}}) => {
    onChange(
      {from, to},
      ["from", "to", "period", "overlaps"]
    )
    notify({
      type: "info",
      content: "date-selected",
      options: {hideProgressBar: true, autoClose: 1000}
    })
  }

  const locale = useLocale()

  const selected = {
    startDate: from.value,
    endDate: to.value,
    key: 'selection',
    color: colors.accent.primary
  }


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
        <DateInput
          error={from.error}
          hasFootnote
          name="from"
          value={selected.startDate}
        />
        <DateInput
          error={to.error}
          hasFootnote
          name="to"
          value={selected.endDate}
        />
      </div>
      <DateRangePicker
        direction="vertical"
        disabledDates={overlaps}
        inputRanges={[]}
        locale={locale}
        minDate={TOMORROW}
        onChange={handleSelect}
        ranges={[selected]}
        staticRanges={[]}
      />
    </div>
  )
}

export default Calendar