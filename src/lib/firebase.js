import firebase from 'firebase'
import "firebase/firestore"

firebase.initializeApp({
  apiKey: "AIzaSyB4-Y2_RCdrOouJJxUJkBBXGyj4hNdjDs0",
  authDomain: "bibic-vendeghazak-api.firebaseapp.com",
  databaseURL: "https://bibic-vendeghazak-api.firebaseio.com",
  projectId: "bibic-vendeghazak-api",
  storageBucket: "bibic-vendeghazak-api.appspot.com",
  messagingSenderId: "586582307718"
})
const firestore = firebase.firestore()
firestore.settings({timestampsInSnapshots: true})

export const DB = firebase.database()
export const ROOMS_REF = DB.ref("rooms")
export const RESERVATIONS_REF = DB.ref("reservations")
export const ROOM_SERVICES_REF = DB.ref("roomServices")
export const CERTS_REF = DB.ref("certificates")
export const PARAGRAPHS_REF = DB.ref("paragraphs")
export const MESSAGES_REF = DB.ref("messages")


export const FS = firebase.firestore()
export const RESERVATIONS_FS_REF = FS.collection("reservations")


export const TIMESTAMP_DB = firebase.database.ServerValue.TIMESTAMP
export const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()