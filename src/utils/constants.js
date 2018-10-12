import moment from "moment"


const CLOUD_FUNCTION_BASE_URL = "https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net"
const TODAY = moment()
const TOMORROW = TODAY.add(1, "day").startOf("day")


export {
  CLOUD_FUNCTION_BASE_URL,
  TODAY, TOMORROW
}