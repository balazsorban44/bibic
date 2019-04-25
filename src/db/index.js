import React, {Component, createContext, useReducer, useEffect} from 'react'
import useNotification from "hooks/useNotification"
import {useFetch} from 'db/fetch'
import {initialState} from 'db/initialState'
import reducer from 'db/reducer'
import {
  PARAGRAPHS,
  GALLERIES,
  ROOMS,
  ROOM_SERVICES,
  FEEDBACKS,
  FETCH_OVERLAPS
} from 'db/actions'

export const Store = createContext()

/***/
export default function Database({children}) {
  const {notify} = useNotification()

  const [state, dispatch] = useReducer(reducer, initialState)

  const {fetch: fetchData} = useFetch(dispatch, state.locale)

  // Fetch and all initial data
  useEffect(() => {
    fetchData({ref: "paragraphs", action: PARAGRAPHS, shouldShort: true})
    fetchData({ref: "galleries", action: GALLERIES, shouldShort: true})
    fetchData({ref: "roomServices", action: ROOM_SERVICES})
    fetchData({ref: "rooms", action: ROOMS})
    fetchData({ref: "feedbacks", action: FEEDBACKS, type: "FS"})
  }, [fetchData])


  useEffect(() => {
    const fetchOverlaps = async () => {
      try {
        const roomId = state.reservation.roomId
        if (roomId) {
          const {eachDayOfInterval, endOfDay, subDays} = await import('date-fns')
          const overlaps = await (await fetch(`${process.env.REACT_APP_CLOUD_FUNCTION_BASE_URL}/getOverlaps?roomId=${roomId}`)).json()
          dispatch({
            type: FETCH_OVERLAPS,
            payload: overlaps.reduce((acc, {start, end}) => [
              ...acc,
              ...eachDayOfInterval({start, end: endOfDay(subDays(end, 1))})
            ], [])
          })
        }
      } catch (error) {
        notify("fetch-overlaps", {type: "error", message: error.message})
      }
    }
    fetchOverlaps()
  }, [state.reservation.roomId, notify])


  return <Store.Provider value={{dispatch, ...state}}>{children} </Store.Provider>
}


/**
 * REVIEW: @see https://reactjs.org/docs/context.html#classcontexttype check this out to replace UNSAFE_withStore
 * Makes the Store values available
 * @param {Component} WrappedComponent The component to pass the store values to
 * @returns {Component} Component with the Store values
 * @deprecated will be excluded in 2.0
 */
export const UNSAFE_withStore = WrappedComponent =>
  class extends Component {
    render() {
      return (
        <Store.Consumer>
          {values => <WrappedComponent{...{...values, ...this.props}}/>}
        </Store.Consumer>
      )
    }
  }
