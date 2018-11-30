import {addDays, startOfDay} from "date-fns"

export const BASE_URL="https://bibicvendeghazak.hu"
export const CLOUD_FUNCTION_BASE_URL = "https://europe-west1-bibic-vendeghazak-api.cloudfunctions.net"
export const TODAY = startOfDay(new Date())
export const TOMORROW = addDays(TODAY, 1)

export const FEEDBACK_FORM = "/visszajelzes"