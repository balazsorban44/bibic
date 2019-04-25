import {useEffect, useContext, useCallback, useState} from 'react'
import {Store} from 'db'
import useNotification from './useNotification'
import {query as Query} from 'utils/query'
import {validator, validate} from 'utils/validate'
import {LOADING} from 'db/actions'
import routes from 'utils/routes'
/**
 * Hook to set up a form
 */
export default function useForm ({
  name,
  // Bridge to Global Database
  actions: {UPDATE, RESET},
  submit,
  // Validation
  validate: {
    validations,
    helpers
  }={},
  // Routing
  query: {
    push,
    root,
    string: queryString
  }
}) {
  const {
    loading,
    dispatch,
    rooms, // REVIEW:,
    ...store
  } = useContext(Store)

  const fields = store[name]
  const {notify} = useNotification()

  const [errors, setErrors] = useState({})


  // Respond to input changes, like text fields, buttons etc. It also does validation
  const handleChange = useCallback((newFields, validations=[]) => {
    [...Object.keys(newFields), ...validations].forEach(key => {
      const error = !validator[key](newFields)
      setErrors(e => ({...e, [key] :error}))
      if (error) notify(`errors.${key}`, {type: "error"})
    })
    push(`${root}?${Query.stringify(newFields, queryString)}`)
    dispatch({type: UPDATE, payload: newFields})
  }, [dispatch, notify, queryString, root, push, UPDATE])

  // Called when a form is submitted. It does a validation on the whole form object before it is sent.
  const handleSubmit = useCallback(e => {
    e.preventDefault()
    let errors = validate(Array.isArray(validations) ? validations : Object.keys(fields), fields, helpers)
    if (errors.length) {
      errors.forEach(error => {
        notify(`errors.${error}`, {type: "error"}) // BUG: Notify fires n^2 times, where n is length of errors
      })
      errors = errors.reduce((a,e) => ({...a, [e]: true}), {})
      setErrors(e => ({...e, ...errors}))
    } else {
      submit({
        [name]: fields,
        loading: payload => dispatch({type: LOADING, payload}),
        close: () => {
          dispatch({type: RESET})
          notify(`${name}.success`, {type: "success", autoClose: 7500})
          setTimeout(() => {push(routes.HOME)}, 7500)
        },
        notify
      })
    }
  }, [
    RESET, validations, dispatch,
    // REVIEW: Find a better way to optimize here.
    JSON.stringify(fields), JSON.stringify(helpers),
    name, notify, push, submit
  ])

  // Updates the store whenever the URL changes
  useEffect(() => {
    dispatch({type: UPDATE, payload: Query.parse(queryString)})
  }, [
    UPDATE, dispatch, queryString,
    rooms.length // REVIEW:
  ])

  // Jumps to the top of the window at mount
  useEffect(() => {window.scrollTo(0, 0)}, [])

  return ({
    fields,
    errors,
    handleChange,
    handleSubmit,
    loading
  })
}