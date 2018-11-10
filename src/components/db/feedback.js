import {validateFeedback} from "../../utils/validate"
import {sendNotification} from "./notification"
import {CLOUD_FUNCTION_BASE_URL} from "../../utils/constants"


export const subscribeToFeedbacks = (ref, callback) => {
  ref
    .where("accepted", "==", true)
    .orderBy("timestamp", "asc")
    .limit(20)
    .onSnapshot(snap => {
      const feedbacks = []
      snap.forEach(feedback => {
        feedback = feedback.data()
        feedback.content !== "" && feedbacks.push(feedback)
      })
      callback(feedbacks)
    })
}

export const isValidFeedback = feedback => {
  if (!feedback) {
    sendNotification("error", "Hibás visszajelzés.")
    return false
  }
  const error = validateFeedback(feedback)
  if (!error) {
    return true
  } else {
    sendNotification("error", error)
    return false
  }
}

export const submitFeedback = async (feedback, setLoading) => {
  if (isValidFeedback(feedback)) {
    setLoading(true)
    try {
      const reservation_exists_URL = `${CLOUD_FUNCTION_BASE_URL}/reservationExists?id=${feedback.id}&customId=${feedback.customId}`
      if (await (await fetch(reservation_exists_URL)).json()) {
        const {
          ratings, id, customId, content
        } = feedback
        const avg = Math.floor(Object.values(ratings).reduce((a,e) => a+e)/Object.keys(ratings).length)
        const {FEEDBACKS_FS_REF, TIMESTAMP} = await import("../../lib/firebase")
        await FEEDBACKS_FS_REF.doc(id).set({
          ratings,
          roomId: parseInt(customId.split("sz")[1], 10),
          id: customId,
          content: content || "*".repeat(avg),
          timestamp: TIMESTAMP,
          accepted: false
        })
        setLoading(false)
        sendNotification("successful-feedback")
        return ({success: true})
      } else {
        // There is no corresponding reservation to this feedback.
        sendNotification("no-reservation-found")
        setLoading(false)
        return ({error: true})
      }
    }
    catch({message}) {
      setLoading(false)
      sendNotification("error", message)
      return ({error: true})
    }
  } else {
    //Only validation error
    return ({})
  }
}