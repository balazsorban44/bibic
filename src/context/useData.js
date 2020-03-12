import {useState, useEffect} from "react"
import {flattenDocs} from "utils/firebase"
import {useHistory} from "react-router"
import {routes} from "utils/env"


/**
 * Fetches data from Firestore
 * @param {firebase.firestore.Query} query
 */
export const useData = (query) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const history = useHistory()
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const {docs} = await query.get()
        const data = docs.map(flattenDocs)
        setData(data)
      } catch (error) {
        // throw Error(`TODO: Handle this error ${error}`)
        history.push(routes.ERROR, {error, from: history.location})
      } finally {
        setLoading(false)
      }
    })()
  }, [history, query])

  return [data, loading]
}