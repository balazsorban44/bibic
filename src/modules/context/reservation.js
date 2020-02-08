import React, {useMemo, useCallback} from "react"
import {FormProvider} from "another-use-form-hook"
import getParams from "utils/getParams"
import {useLocation} from "react-router"
import {TOMORROW} from "utils/constants"
import {mealPlans, validators} from "utils/validate"
import {useNotification} from "hooks"
import useOverlaps from "hooks/useOverlaps"

export const ReservationProvider = ({children}) => {
  const {search} = useLocation()
  const params = getParams(search, "roomId")

  const roomId = useMemo(() => parseInt(params.roomId, 10) || 1, [params.roomId])

  const notify = useNotification()
  // TODO: validate period before submitting
  const onSubmit = useCallback((...args) => console.log(args), [])

  const overlaps = useOverlaps(roomId)

  return (
    <FormProvider
      initialStates={{
        reservation: {
          roomId,
          from: TOMORROW,
          to: TOMORROW,
          name: "",
          email: "",
          address: "",
          phone: "",
          message: "",
          adults: 1,
          children: [],
          mealPlan: mealPlans.BREAKFAST,
          price: 0
        }
      }}
      onNotify={(type, reasons) => {
        switch (type) {
        case "submitSuccess":
          console.log("success")
          break
        case "submitError":
          reasons.forEach(reason => notify("error", reason))
          console.error(reasons)
          break
        case "validationErrors":
          reasons.forEach(reason => notify("error", reason))
          console.error(reasons)
          break
        default:
          break
        }
      }}
      onSubmit={onSubmit}
      validators={{reservation: validators(overlaps)}}
    >
      {children}
    </FormProvider>
  )
}