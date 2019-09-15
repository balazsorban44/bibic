type FieldPath = firebase.firestore.FieldPath
type WhereFilterOp = firebase.firestore.WhereFilterOp
type FieldValue = firebase.firestore.FieldValue

/**
 * Hook to subscribe to a certain location in Firebase 🔥
 * 
 * It can be either Realtime DB or Firestore, depending on
 * 
 * if you provide a `ref` or `collection` parameter. 
 */
declare function useSubscription<T>(UseSubscribtionParams : {
  /** If using Realtime DB, you should define a ref.*/
  ref?: string
  /** Does the result contain text that is localized? */
  localize: boolean = true
  /** If using Firestore, you should define a collection. */
  collection?: string
  /** Query the Firestore collection*/
  where: [FieldPath, WhereFilterOp, FieldValue] = []
  initialState: T
}) : [T, boolean]

export default useSubscription