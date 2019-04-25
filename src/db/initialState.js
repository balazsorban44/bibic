import {PREFERRED_LANGUAGE} from "utils/language"
import {TOMORROW, TODAY} from "utils/constants"


export const initialReservation = {
  roomId: null,
  from: TOMORROW,
  to: TOMORROW,
  name: "",
  email: "",
  address: "",
  phone: "",
  message: "",
  adults: 1,
  children: [],
  mealPlan: "breakfast",
  price: 0
}

export const initialMessage = {
  content: "",
  subject: "other",
  address: "",
  name: "",
  email: "",
  phone: ""
}

export const initialFeedback = {
  message: "",
  coffee: 0,
  cleanliness: 0,
  comfort: 0,
  food: 0,
  services: 0,
  staff: 0
}


export const initialState = {
  hero: [],
  loading: false,
  tomorrow: TOMORROW,
  paragraphs: {},
  galleries: {},
  month: TODAY,
  reservation: initialReservation,
  message: initialMessage,
  feedback: initialFeedback,
  rooms: [],
  roomServices: [],
  overlaps: [],
  feedbacks: {all: null, rooms: {}},
  locale: PREFERRED_LANGUAGE()
}
