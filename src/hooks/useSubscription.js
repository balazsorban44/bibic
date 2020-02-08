import {useTranslation} from "react-i18next"
import {useState, useEffect} from "react"
import {DB, FS} from "lib/firebase"
import flatten from "utils/flatten"


const useSubscription = ({
  ref, localize = true,
  collection, where = [],
  initialState = []
}={}) => {

  if(!ref && !collection) throw new TypeError("You have to define either ref or collection to use Realtime DB or Firestore")


  const {i18n} = useTranslation()
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe
    if (ref) {
      const dbRef = localize ? DB.ref(i18n.language).child(ref) : DB.ref(ref)
      dbRef.on("value", snap => {
        snap.exists() && setState(snap.val())
        setLoading(false)
      })
      unsubscribe = () => dbRef.off("value")
    } else {
      const fsRef = where.length ? FS.collection(collection).where(...where) : FS.collection(collection)
      unsubscribe = fsRef.onSnapshot(({empty, docs}) => {
        !empty && setState(docs.map(flatten))
        setLoading(false)
      })
    }

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, i18n.language, localize, ref, ...where])


  return [state, loading]
}

export default useSubscription