import React, { Suspense, useContext, useEffect, lazy, useState } from 'react'
import { Store } from 'db'
import {useNotification} from 'hooks'
import { Date as DateLabel} from 'components/shared/Form/inputs'
import { Loading } from 'components/shared/Elements'
import { TOMORROW } from 'utils/constants'
import colors from 'utils/colors'

import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { useTranslation } from 'react-i18next';

const formatFromTo = ({startDate, endDate}) => ({
  from: format(startDate, "YYYY-MM-dd", {awareOfUnicodeTokens: true}),
  to: format(endDate, "YYYY-MM-dd", {awareOfUnicodeTokens: true})
})


/*
 *  NOTE: Implemented locally
 * @see https://github.com/Adphorus/react-date-range/pull/246
 */


const DateRangePicker =
  lazy(() => import("lib/react-date-range/components/DateRangePicker"))


export default ({onChange, from, to, errors}) => {
  const [t, i18n] = useTranslation("reservation")
  const {notify} = useNotification()
  const {overlaps} = useContext(Store)


  useEffect(() => {
    const fetchDateRangePickerCSS = async () => 
      await import('lib/react-date-range/theme/default.css')
    fetchDateRangePickerCSS()
  }, [])

  const [locale, setLocale] = useState(enGB)

  
  useEffect(() => {
    const fetchCalendarLocale = async () => {
      let locale
      try {
      switch (i18n.language) {
        case "hu":
        locale = await import(`date-fns/locale/hu`)
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
  const handleSelect = ({ selection }) => {
    if (temp.from && temp.to) {
      onChange(formatFromTo(selection), ["period"])
      setTemp({})
    } else setTemp(formatFromTo(selection))
    notify("calendar-select-success", {hideProgressBar: true, autoClose: 1000})
  }


  const selected = {
    startDate: new Date(temp.from || from),
    endDate: new Date(temp.to || to),
    key: 'selection',
    color: colors.accent.primary
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        <DateLabel
          error={errors.from}
          required
          label={t("fields.from")}
          name="from"
          value={temp.from || from}
          />
        <DateLabel
          error={errors.to}
          required
          label={t("fields.to")}
          name="to"
          value={temp.to || to}
        /> </div> {
        <Suspense fallback={<Loading />}>
          <DateRangePicker
            className={errors.period ? "invalid-period" : ""}
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
      } </div>
  )
}