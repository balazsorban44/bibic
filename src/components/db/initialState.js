import {TOMORROW, TODAY} from "../../utils/constants"


export const initialReservation = {
  roomId: null,
  from: TOMORROW,
  to: TOMORROW,
  name: "",
  email: "",
  address: "",
  tel: "",
  message: "",
  adults: 1,
  children: [],
  foodService: "breakfast",
  price: 0
}

export const initialMessage = {
  content: "",
  subject: "other",
  address: "",
  name: "",
  email: "",
  tel: ""
}


export const initialState = {
  hero: [],
  isReserving: false,
  isMessageLoading: false,
  tomorrow: TOMORROW,
  paragraphs: {},
  galleries: {},
  month: TODAY,
  reservation: initialReservation,
  message: initialMessage,
  rooms: [],
  roomServices: [],
  overlaps: [],
  feedbacks: {all: null, rooms: {}}
}
