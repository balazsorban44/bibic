import * as firebase from 'firebase/app'
import "firebase/database"
import "firebase/firestore"

firebase.initializeApp({
  apiKey: "AIzaSyB4-Y2_RCdrOouJJxUJkBBXGyj4hNdjDs0",
  authDomain: "bibic-vendeghazak-api.firebaseapp.com",
  databaseURL: "https://bibic-vendeghazak-api.firebaseio.com",
  projectId: "bibic-vendeghazak-api",
  storageBucket: "bibic-vendeghazak-api.appspot.com",
  messagingSenderId: "586582307718"
})


export const DB = firebase.database()

export const FS = firebase.firestore()
export const RESERVATIONS_FS_REF = FS.collection("reservations")
export const MESSAGES_FS_REF = FS.collection("messages")
export const FEEDBACKS_FS_REF = FS.collection("feedbacks")


export const TIMESTAMP_DB = firebase.database.ServerValue.TIMESTAMP
export const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()

export default firebase