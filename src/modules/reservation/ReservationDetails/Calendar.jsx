import React, {Suspense, useEffect, lazy, useState} from "react"

import {useNotification} from "hooks"
import Loading from "components/Loading"
import {TOMORROW} from "utils/constants"
import colors from "utils/colors"

import {enGB} from "date-fns/locale"
import {useTranslation} from "react-i18next"
import {Input} from "ui"

const formatFromTo = ({startDate: from, endDate: to}) => ({from, to})


/*
 *  NOTE: Implemented locally
 * @see https://github.com/Adphorus/react-date-range/pull/246
 */


const DateRangePicker =
  lazy(() => import("lib/react-date-range/components/DateRangePicker"))


export default ({onChange, roomId, from, to}) => {
  const [t, i18n] = useTranslation("reservation")
  const notify = useNotification()

  const [overlaps, setOverlaps] = useState([])

  useEffect(() => {
    const fetchOverlaps = async () => {
      try {
        if (roomId) {
          const {eachDayOfInterval, endOfDay, subDays} = await import("date-fns")
          const data = await (await fetch(`${process.env.REACT_APP_CLOUD_FUNCTION_BASE_URL}/getOverlaps?roomId=${roomId}`)).json()
          const overlaps = []
          data.forEach(({start, end}) => {
            overlaps.push(
              ...eachDayOfInterval({
                start: new Date(start),
                end: endOfDay(subDays(new Date(end), 1))
              })
            )
          })

          setOverlaps(overlaps)

        }
      } catch (error) {
        console.error(error)
        notify("error", "fetch-overlaps", {message: error.message})
      }
    }
    fetchOverlaps()
  }, [notify, roomId])


  useEffect(() => {
    const fetchDateRangePickerCSS = async () =>
      await import("lib/react-date-range/theme/default.css")
    fetchDateRangePickerCSS()
  }, [])

  const [locale, setLocale] = useState(enGB)


  useEffect(() => {
    const fetchCalendarLocale = async () => {
      let locale
      try {
        switch (i18n.language) {
        case "hu":
          locale = await import("date-fns/locale/hu")
          break
        case "en":
        default: break
        }
      } catch (error) {
        console.error(error)
      } finally {
        locale && setLocale(locale)
      }
    }
    fetchCalendarLocale()
  }, [i18n.language])


  const [temp, setTemp] = useState({})
  const handleSelect = ({selection}) => {
    if (temp.from && temp.to) {
      onChange(formatFromTo(selection), ["period"])
      setTemp({})
    } else setTemp(formatFromTo(selection))
    notify("success", "calendar-select-success")
  }


  const selected = {
    startDate: temp.from || from.value,
    endDate: temp.to || to.value,
    key: "selection",
    color: colors.accent.primary
  }


  return (
    <div style={{display: "flex", flexDirection: "column", flex: 1}}>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"}}>
        <Input
          error={from.error}
          label={t("fields.from")}
          name="from"
          onClick={() => notify("warn", "use-calendar")}
          readOnly
          required
          value={t("fields.date-label", {value: selected.startDate})}
        />
        <Input
          error={to.error}
          label={t("fields.to")}
          name="to"
          onClick={() => notify("warn", "use-calendar")}
          readOnly
          required
          value={t("fields.date-label", {value: selected.endDate})}
        />
      </div>
      <Suspense fallback={<Loading />}>
        <DateRangePicker
          className={from.error && to.error ? "invalid-period" : ""}
          direction="vertical"
          disabledDates={overlaps}
          inputRanges={[]}
          locale={locale}
          minDate={TOMORROW}
          onChange={handleSelect}
          ranges={[selected]}
          staticRanges={[]}
        />
      </Suspense>
    </div>
  )
}