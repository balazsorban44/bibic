export const fetchData = async (ref, shouldSort) => {
  const result = await (await ref.once("value")).val()

  if (!shouldSort) {
    return result
  }

  return Object.keys(result).forEach(path => {
    result[path] = Object.values(result[path]).sort((a, b) => a.order - b.order)
  })
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
