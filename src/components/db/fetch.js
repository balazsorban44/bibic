import {sendNotification} from "./notification"

export const fetchData = async (ref, shouldSort) => {
  let result
  try {
    result = await ref.once("value")
    result = await result.val()
    if (shouldSort) {
      Object.keys(result).forEach(path => {
        result[path] = Object.values(result[path]).sort((a, b) => a.order - b.order)
      })
    }
    return result
  } catch (error) {
    sendNotification("error", error.message)
    return false
  }
}

export const subscribeToDatabase = (ref, callback, shouldSort) => {
  ref.on("value", snap => {
    const result = snap.val()
    if (shouldSort) {
      Object.keys(result).forEach(path => {
        result[path] = Object.values(result[path]).sort((a, b) => a.order - b.order)
      })
    }
    callback(result)
  })
}
