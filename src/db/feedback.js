
export const subscribeToFeedbacks = (ref, callback) => {
  ref
    .where("accepted", "==", true)
    .orderBy("timestamp", "desc")
    .limit(20)
    .onSnapshot(snap => {
      const feedbacks = []
      snap.forEach(feedback => {
        feedback = feedback.data()
        feedback.content !== "" && feedbacks.push({...feedback, timestamp: feedback.timestamp.toDate()})
      })
      callback(feedbacks.length ? feedbacks : null)
    })
}

export const submit = async ({feedback, loading, close, notify}) => {
  loading(true)
  try {
    const reservation_exists_URL = `${process.env.REACT_APP_CLOUD_FUNCTION_BASE_URL}/reservationExists?id=${feedback.id}&customId=${feedback.customId}`
    if (true || await (await fetch(reservation_exists_URL)).json()) {

      const {
        coffee,
        cleanliness,
        comfort,
        food,
        services, id, customId, message
      } = feedback
      const ratings = {coffee, cleanliness, comfort, food, services}
      const avg = Math.floor(Object.values(ratings).reduce((a,e) => a+e)/Object.keys(ratings).length)
      const {FEEDBACKS_FS_REF, TIMESTAMP} = await import("lib/firebase")
      const f = {
        ratings,
        roomId: customId.split("sz")[1].split("-").map(r => parseInt(r, 10)),
        id: customId,
        content: message || "*".repeat(avg),
        timestamp: TIMESTAMP,
        accepted: false
      }
      console.log(f)
      // await FEEDBACKS_FS_REF.doc(id).set(f)
      loading(false)
      return "success"
    } else {
      // There is no corresponding reservation to this feedback.
      notify("feedback.no-reservation-found", {type: "error"})
      loading(false)
      return "error"
    }
  }
  catch({message}) {
    loading(false)
    notify("feedback.submit-error", {type:"error", message})
    return "error"
  }
}