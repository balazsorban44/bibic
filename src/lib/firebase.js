import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyB4-Y2_RCdrOouJJxUJkBBXGyj4hNdjDs0",
  authDomain: "bibic-vendeghazak-api.firebaseapp.com",
  databaseURL: "https://bibic-vendeghazak-api.firebaseio.com",
  projectId: "bibic-vendeghazak-api",
  storageBucket: "bibic-vendeghazak-api.appspot.com",
  messagingSenderId: "586582307718"
})


export const DB = firebase.database()
export const ROOMS_REF = DB.ref("rooms")
export const CERTS_REF = DB.ref("certificates")
export const FS = firebase.storage()
const PHOTOS_REF = FS.ref("photos")
export const ROOMS_PHOTOS_REF = PHOTOS_REF.child("rooms")