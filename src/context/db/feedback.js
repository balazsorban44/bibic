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
