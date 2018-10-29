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
export const submitMessage = (message, messageLoading, resetMessage, closeMessage) => {
  if (isValidMessage(message)) {
    messageLoading(true)
    import('../../lib/firebase').then(({MESSAGES_FS_REF, TIMESTAMP}) => {
      MESSAGES_FS_REF.add({
        ...message,
        timestamp: TIMESTAMP,
        lastHandledBy: "",
        accepted: false
      })
        .then(() => {
          sendNotification("messageSuccess")
          messageLoading(false)
          setTimeout(() => {
            resetMessage()
            closeMessage()
            return true
          }, 7500)
        })
        .catch(({message}) => {
          messageLoading(false)
          sendNotification("error", message)
          return false
        })
    })
  } else {
    messageLoading(false)
    return false
  }
}