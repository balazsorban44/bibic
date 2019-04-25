import {useEffect, useRef, useCallback} from 'react'
import {PREFERRED_LANGUAGE} from 'utils/language'

/**
 * Hook to fetch data from Firebase
 * @param {*} dispatch
 */
export function useFetch(dispatch, locale) {
  const dbRequests = useRef([])

  const fetch = useCallback(async ({ref, action, type="DB", shouldSort, locale}) => {
    locale = PREFERRED_LANGUAGE(locale)
    if (!dbRequests.current.find(dbRequest => dbRequest.ref === ref)) {
      dbRequests.current.push({ref, action, type, shouldSort})
    }
    switch (type) {
    case "DB": {
      const {DB} = await import("lib/firebase")
      const dbRef = DB.ref(locale).child(ref)
      const snap = await dbRef.once("value")
      if (snap.exists()) {
        const payload = snap.val()
        if (shouldSort) {
          Object.keys(payload).forEach(path => {
            payload[path] = Object.values(payload[path]).sort((a, b) => a.order - b.order)
          })
        }
        dispatch({type: action, payload})
      } else {
        console.log(`${type} at ${ref} is empty`)
      }
      break
    }
    case "FS":
      //TODO:
      break

    default:
      throw new Error(`fetch() type must be DB (Realtime Database) or FS (Firestore), but it was ${type}`)
    }
  }, [dispatch])

  // Refetch data, if locale changed
  useEffect(() => {
    dbRequests.current.forEach(({ref, action, type, shouldSort}) => {
      fetch({ref, action, type, shouldSort, locale})
    })
  }, [fetch, locale])


  return {fetch}
}