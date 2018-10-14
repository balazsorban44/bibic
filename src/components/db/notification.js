import React from 'react'
import {toast} from "react-toastify"

export const sendNotification = (type, message) => {
  switch (type) {
  case "sameDay":
    toast.warning("A foglalás minimum 1 éjszakát kell hogy tartalmazzon. Kérjük válasszon másik dátumot.")
    break
  case "overlap":
    toast.warning("Az adott intervallum már tartalmaz foglalást. Az elérhető leghosszabb intervallum kijelölve. Próbálkozhat új intervallummal, vagy másik szobával.", {autoClose: 10000})
    break
  case "calendarSelectSuccess":
    toast.info("Dátum kiválasztva.", {hideProgressBar: true, autoClose: 1000})
    break
  case "useCalendarAsInput":
    toast.warn("Kérjük, hogy az érkezés és távozás kiválasztásához használja a naptárat.")
    break
  case "wrongInput":
    toast.error(`${message} Ha úgy gondolja más a hiba oka, kérjük írjon az alábbi címre: hiba@bibicvedeghazak.hu`, {autoClose: 7500})
    break
  case "messageSuccess":
    toast.success(
      <p style={{padding: ".5rem",
        fontSize: "1.2rem"}}
      >Üzenet elküldve. <br />
        <span
          style={{fontSize: "1rem"}}
        >
        Néhány másodperc múlva visszakerül a főoldalra.
        További kérdésével fordulhat:<br/>
          <a
            href="mailto:info@bibicvendeghazak.hu"
            style={{color: "white"}}
          >info@bibicvendeghazak.hu</a><br />
          <a
            href="tel:+36305785730"
            style={{color: "white"}}
          >+36 30 578 5730</a>
        </span>
      </p>, {autoClose: 7500})
    break
  case "error":
    toast.error(<span>Hiba: {message}</span>)
    break
  default:
    toast.info(type)
    break
  }
}