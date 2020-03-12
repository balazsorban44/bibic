import React, {createContext, useContext, useCallback} from 'react'
import {toast, ToastContainer} from "react-toastify"
import {useTranslation} from 'react-i18next'
import {useHistory} from 'react-router'


const NotificationMessage = ({type, content}) => {

  const [t] = useTranslation()
  if (typeof content === "string" && type !== "error") {
    return t(`notification.${content}`)
  }

  const {key, message} = content
  switch (type) {
  case "success":
    return (
      <p style={{padding: ".5rem", fontSize: "1.2rem"}} >
        {t(`notification.${key}.header`)} <br/>
        <span style={{fontSize: "1rem"}} >
          {t(`notification.${key}.body`)}<br/>
          <a
            href="mailto:info&#64;bibicvendeghazak.hu"
            style={{color: "white"}}
          >
            {t("email.info")}
          </a><br/>
          <a href="tel:+36305785730" style={{color: "white"}} >
            {"+36 30 578 5730"}
          </a>
        </span>
      </p>
    )
  case "error":
    return (
      <p style={{padding: ".5rem", fontSize: "1.2rem"}} >
        {t(`notification.error.header`, {message})} <br/>
        <span style={{fontSize: "1rem"}}>
          {t(`notification.error.body`)} <br/>
          <a
            href={`mailto:hiba&#64;bibicvedeghazak.hu?subject=Hibajelentés&body=${message}`}
            style={{color: "black"}}
          >
            {t("email.error")}
          </a>
        </span>
      </p>
    )
  case "info":
  case "warn":
    throw new Error("Not implemented")

  default:
    throw new TypeError(`Notification type must be one of: 'success'|'error'|'info'|'warn' but was ${type}`)
  }
}

const Notification = createContext()

export const useNotification = () => useContext(Notification).notify

export const useFormNotification = (form) => {
  const _notify = useNotification()
  const [t] = useTranslation()
  const history = useHistory()

  const notify = useCallback((type, reason) => {

    switch (type) {
    case "submitSuccess": {
      _notify({
        type: "success",
        content: {key: `${form}-success`},
        autoClose: 10000
      })
      return setTimeout(() => history.push("/"), 10000)
    }
    case "submitError":
      return _notify({type: "error", content: {key: `${form}.error`, message: reason}})
    case "validationErrors":

      const fields = reason.map(field => t(`form.${field}`)).join(", ")

      return _notify({
        type: "error",
        content: {message: t("form.invalid", {
          count: reason.length,
          fields
        })}
      })
    default:
      throw new TypeError(`Unknown type ${type}`)
    }
  }, [form, _notify, t, history])

  return notify
}

export const NotificationProvider = ({children}) => {

  const notify = useCallback(({type, content, options = {}}) => {
    const message = <NotificationMessage content={content} type={type}/>
    toast[type](message, options)
    // TODO: Log relevant errors to server
  }, [])

  return (
    <Notification.Provider value={{notify}}>
      <ToastContainer
        closeOnClick
        position="bottom-center"
        style={{
          position: "fixed",
          zIndex: 10001,
          bottom: 0
        }}
      />
      {children}
    </Notification.Provider>
  )
}


export const withNotification = (Component) => (props) => {
  return (
    <Notification.Consumer>
      {(notificationProps) => <Component {...props} {...notificationProps}/>}
    </Notification.Consumer>
  )
}
