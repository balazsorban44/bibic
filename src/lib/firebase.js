import * as firebase from 'firebase/app'
import "firebase/firestore"
import config from 'utils/env'

//TODO: Remove Realtime Database
import "firebase/database"

firebase.initializeApp(config.firebase.initConfig)

//TODO: Move to Firestore then remove 🔥
export const DB = firebase.database()
export const ROOMS_REF = DB.ref("rooms")
export const FEEDBACKS_REF = DB.ref("feedbacks")

export const FS = firebase.firestore()
export const RESERVATIONS_FS_REF = FS.collection("reservations")
export const MESSAGES_FS_REF = FS.collection("messages")
export const FEEDBACKS_FS_REF = FS.collection("feedbacks")

export const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()

export default firebase