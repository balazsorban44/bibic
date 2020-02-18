import firebase from "lib/firebase"

const interpolateData = object => {
  const reducer = (acc, [key, value]) => {
    if (value instanceof firebase.firestore.Timestamp) {
      value = value.toDate()
    }
    acc[key] = value
    return acc
  }
  return Object.entries(object).reduce(reducer, {})
}

export const flattenDocs = (doc) => ({
  key: doc.id,
  id: doc.id,
  ...interpolateData(doc.data())
})