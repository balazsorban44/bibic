import {useRef, useEffect, useCallback} from 'react'
import {useTranslation} from 'react-i18next'

const defaultConfig = {
  closeOnClick: true,
  position:"bottom-center",
  style:{
    position: "fixed",
    zIndex: 10001,
    bottom: 0
  }
}

export default () => {
  const toastRef = useRef(null)
  useEffect(() => {
    if (!toastRef.current) {
      (async () => {
        const {toast} = await import("react-toastify")
        await import('react-toastify/dist/ReactToastify.css')
        toast.configure(defaultConfig)
        toastRef.current = toast
      })()
    }
  }, [])

  const [t] = useTranslation("notifications")

  const notify = useCallback((name, {type="info", message, ...options}) => {
    if (["success", "error", "warn", "info"].includes(type)) {
      const text = t(name, {message})
      if (toastRef.current[type]) toastRef.current[type](text, options)
      else alert(text)
    } else if(type==="custom") {
      //TODO:
    }
  }, [t])

  return {notify}
}