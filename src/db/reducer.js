import {initialMessage, initialReservation, initialFeedback} from "db/initialState"
import {
  PARAGRAPHS,
  GALLERIES,
  ROOMS,
  ROOM_SERVICES,
  FETCH_OVERLAPS,
  UPDATE_RESERVATION,
  RESET_RESERVATION,
  UPDATE_MESSAGE,
  RESET_MESSAGE,
  LOADING,
  LANGUAGE_CHANGE,
  INIT,
  UPDATE_FEEDBACK,
  RESET_FEEDBACK
} from "db/actions"

import getPrice from "./reservation/getPrice"

/**
 * Central logic for global state mutation
 * @param {*} state
 * @param {*} action
 */
export default function reducer(state, {type, payload}) {
  switch (type) {
  case PARAGRAPHS:
    return {...state, paragraphs: payload}
  case GALLERIES:
    return {...state, galleries: payload}
  case ROOMS:
    return {...state, rooms: payload}
  case ROOM_SERVICES:
    return {...state, roomServices: Object.entries(payload)}
  case FETCH_OVERLAPS:
    return {...state, overlaps: payload}
  case UPDATE_RESERVATION: {
    const reservation = {...state.reservation, ...payload}
    reservation.price = getPrice(reservation, state.rooms[reservation.roomId-1])
    return {...state, reservation}
  }
  case RESET_RESERVATION:
    return {...state, reservation: initialReservation}
  case UPDATE_MESSAGE:
    return {...state, message: {...state.message, ...payload}}
  case RESET_MESSAGE:
    return {...state, message: initialMessage}
  case UPDATE_FEEDBACK:
    return {...state, feedback: {...state.feedback, ...payload}}
  case RESET_FEEDBACK:
    return {...state, feedback: initialFeedback}
  case LOADING:
    return {...state, loading: payload}
  case LANGUAGE_CHANGE:
    return {...state, locale: payload}
  case INIT:
    return state // TODO:
  default:
    console.error(`No action defined for action type: ${type}`)
    return state
  }
}

