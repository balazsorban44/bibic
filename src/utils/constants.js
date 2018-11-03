import moment from "moment"

export const BASE_URL="https://bibicvendeghazak.hu"
export const CLOUD_FUNCTION_BASE_URL = "https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net"
export const TODAY = moment()
export const TOMORROW = TODAY.add(1, "day").startOf("day")

export const FEEDBACK_FORM = "/visszajelzes"