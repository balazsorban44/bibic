/**
 * Sends the message to the server.
 * @param {*} message
 * @param {*} loading
 * @param {*} reset - resets the message to the inital values
 * @param {*} close - closes the message form
 */
export const submit = async ({message, loading, close, notify}) => {
  loading(true)
  try {
    // const {MESSAGES_FS_REF, TIMESTAMP} = await import("lib/firebase")

    console.log(message)
    // await MESSAGES_FS_REF.add({
    //   ...message,
    //   timestamp: TIMESTAMP,
    //   lastHandledBy: "",
    //   accepted: false
    // })


    loading(false)
    close()
    return true
  } catch ({message}) {
    loading(false)
    notify("message.submit-error", {type: "error", message})
    return false
  }
}