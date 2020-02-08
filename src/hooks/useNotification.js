import {useTranslation} from "react-i18next"
import toast from "cogo-toast"
import {useCallback} from "react"


/** Hook to make use of notifications */
export default function useNotification() {
  const [t] = useTranslation("notifications")

  const notify = useCallback((type, messageType, options) => {
    const base = `${messageType}.${type}`

    const message = t(`${base}.body`, options)
    const headingPath = `${base}.title`
    const heading = t(headingPath)
    toast[type](
      message,
      {
        heading: heading === headingPath ? undefined : heading,
        position: "bottom-right",
        hideAfter: 7.5
      }
    )
  }, [t])

  return notify
}