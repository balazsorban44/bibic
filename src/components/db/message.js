import {validateMessage} from '../../utils/validate'
import {sendNotification} from './notification'


export const isValidMessage = message => {
  const error = validateMessage(message)
  if (!error) {
    return true
  } else {
    sendNotification("error", error)
    return false
  }
}

/**
 * Sends the message to the server.
 * @param {*} message
 * @param {*} messageLoading
 * @param {*} resetMessage - resets the message to the inital values
 * @param {*} closeMessage - closes the message form
 */
export const submitMessage = async (message, messageLoading, resetMessage, closeMessage) => {
  messageLoading(true)
  if (isValidMessage(message)) {
    try {
      const {MESSAGES_FS_REF, TIMESTAMP} = await import("../../lib/firebase")

      await MESSAGES_FS_REF.add({
        ...message,
        timestamp: TIMESTAMP,
        lastHandledBy: "",
        accepted: false
      })

      sendNotification("messageSuccess")
      messageLoading(false)

      setTimeout(() => {
        resetMessage()
        closeMessage()
      }, 7500)

      return true
    } catch ({message}) {
      messageLoading(false)
      sendNotification("error", message)
      return false
    }
  } else {
    messageLoading(false)
    return false
  }
}