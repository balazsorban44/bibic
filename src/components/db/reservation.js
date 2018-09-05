import moment from "moment"

export const isAvailable = (roomId, from, to) => {
  from = moment(from).format("YYYY-MM-DD")
  to = moment(to).format("YYYY-MM-DD")
  const url = "https://us-central1-bibic-vendeghazak-api.cloudfunctions.net/overlaps?"
  return fetch(`${url}roomId=r${roomId}&date=${from}_${to}`)
    .then(res => res.json())
    .catch(console.error)
}