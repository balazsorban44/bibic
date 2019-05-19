import * as firebase from 'firebase/app'
import "firebase/database"
import "firebase/firestore"


// Staging/test/dev
let config = {
  apiKey: "AIzaSyBYH1erXxdf3W_vQ-b7PRoA5oiK3mYsno0",
  authDomain: "bibic-vendeghazak-web-beta.firebaseapp.com",
  databaseURL: "https://bibic-vendeghazak-web-beta.firebaseio.com",
  projectId: "bibic-vendeghazak-web-beta",
  storageBucket: "bibic-vendeghazak-web-beta.appspot.com",
  messagingSenderId: "456228212717",
  appId: "1:456228212717:web:19b58c6bdc4ef10c"
}


// Production
if (
  "location" in window &&
  "bibicvendeghazak.hu" === window.location.hostname
) {
  config = {
    apiKey: "AIzaSyB4-Y2_RCdrOouJJxUJkBBXGyj4hNdjDs0",
    authDomain: "bibic-vendeghazak-api.firebaseapp.com",
    databaseURL: "https://bibic-vendeghazak-api.firebaseio.com",
    projectId: "bibic-vendeghazak-api",
    storageBucket: "bibic-vendeghazak-api.appspot.com",
    messagingSenderId: "586582307718"
  }
}

firebase.initializeApp(config)


export const FS = firebase.firestore()
export const DB = firebase.database()

export const RESERVATIONS_FS_REF = FS.collection("reservations")
export const MESSAGES_FS_REF = FS.collection("messages")
export const FEEDBACKS_FS_REF = FS.collection("feedbacks")


export const TIMESTAMP_DB = firebase.database.ServerValue.TIMESTAMP
export const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()

export default firebase