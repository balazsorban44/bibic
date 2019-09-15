import {useTranslation} from "react-i18next"
import {useState, useEffect, useRef} from "react"
import {DB, FS} from "lib/firebase"
import flatten from "utils/flatten"

const subscriptions = []


const useSubscription = ({
  ref,
  collection,
  where: [fieldPath, opStr, value] = [],
  initialState,
  localize = true
}={}) => {


  if(!ref && !collection) throw new TypeError("You have to define either ref or collection to use Realtime DB or Firestore")

  const {i18n} = useTranslation()
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)


  const id = (ref ? [ref, i18n.language] : [collection, fieldPath, opStr, value]).join(".")

  useEffect(() => {

    if (subscriptions.find(s => s.id === id)) return

    setLoading(true)
    if (ref) {
      const dbRef = localize ?
        DB.ref(i18n.language).child(ref) :
        DB.ref(ref)


      dbRef.on("value", snap => {
        snap.exists() && setState(snap.val())
      })

      subscriptions.push({
        id,
        type: "DB",
        unsubscribe: () => dbRef.off("value")
      })

    } else {
      const fsRef = fieldPath ?
        FS.collection(collection).where(fieldPath, opStr, value) :
        FS.collection(collection)

      subscriptions.push({
        id,
        type: "FS",
        unsubscribe: fsRef.onSnapshot(snap => {
          !snap.empty && setState(snap.docs.map(flatten))
        })
      })
    }

    setLoading(false)

  }, [collection, fieldPath, i18n.language, id, localize, opStr, ref, value])

  const unsubscribe = () => {
    const subscription = subscriptions.find(s => s.id === id)
    return subscription && subscription.unsubscribe()
  }

  return [state, loading, unsubscribe]
}

export default useSubscription