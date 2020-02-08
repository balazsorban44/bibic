import React from "react"

import {useNotification} from "hooks"
import {TOMORROW} from "utils/constants"

import {useTranslation} from "react-i18next"
import {Input} from "ui"
import clsx from "clsx"
import "./calendar.sass"
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle"
import {isSameDay} from "date-fns"
import useOverlaps from "hooks/useOverlaps"


export default ({onChange, roomId, from, to, overlapError, nightError}) => {
  const [t] = useTranslation("reservation")
  const notify = useNotification()
  const overlaps = useOverlaps(roomId)

  const handleDisabledDates = ({date}) => overlaps.some(overlap => isSameDay(date, overlap))

  const handleSelect = ([from, to]) => onChange({from, to}, ["overlap", "night"])

  const intervalError = overlapError || nightError

  const handleFocusCapture = () => intervalError ? notify("error", "period") : notify("warn", "use-calendar")
  return (
    <>
      <Input
        error={from.error || intervalError}
        label={t("fields.from")}
        name="from"
        onFocusCapture={handleFocusCapture}
        readOnly
        required
        value={t("fields.date-label", {value: from.value})}
      />
      <Input
        error={to.error || intervalError}
        label={t("fields.to")}
        name="to"
        onFocusCapture={handleFocusCapture}
        readOnly
        required
        value={t("fields.date-label", {value: to.value})}
      />
      <DateRangePicker
        className={clsx(
          "date-range-picker",
          {"invalid-interval" : overlapError || nightError}
        )}
        isOpen
        locale="hu-HU"
        minDate={TOMORROW}
        onChange={handleSelect}
        showFixedNumberOfWeeks
        tileClassName="date-tile"
        tileDisabled={handleDisabledDates}
        value={[from.value, to.value]}
      />
    </>
  )
}