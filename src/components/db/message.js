import {validateMessage} from '../../utils/validate'
import {sendNotification} from './notification'

/**
 * Sends the message to the server.
 * @param {*} message
 * @param {*} messageLoading
 * @param {*} reset - resets the message to the inital values
 * @param {*} goToMain - redirects to the main page
 */
export const submitMessage = (message, messageLoading, reset, goToMain) => {
  const error = validateMessage(message)
  messageLoading(true)
  if (!error) {
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
            reset()
            goToMain()
          }, 7500)
        })
        .catch(({message}) => {
          messageLoading(false)
          sendNotification("error", message)
        })
    })
  } else {
    messageLoading(false)
    sendNotification("error", error)
  }
}