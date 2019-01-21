import React from 'react'
import {toast} from "react-toastify"

export const sendNotification = (type, message) => {
  switch (type) {
  case "sameDay":
    toast.warn("A foglalás minimum 1 éjszakát kell hogy tartalmazzon. Kérjük válasszon másik dátumot.")
    break
  case "overlap":
    toast.warn("Az adott intervallum már tartalmaz foglalást. Az elérhető leghosszabb intervallum kijelölve. Próbálkozhat új intervallummal, vagy másik szobával.", {autoClose: 10000})
    break
  case "calendarSelectSuccess":
    toast.info("Dátum kiválasztva.", {hideProgressBar: true, autoClose: 1000})
    break
  case "useCalendarAsInput":
    toast.warn("Kérjük, hogy az érkezés és távozás kiválasztásához használja a naptárat.")
    break
  case "wrongInput":
    toast.error(`${message} Ha úgy gondolja más a hiba oka, kérjük írjon az alábbi címre: hiba kukac bibicvedeghazak pont hu`, {autoClose: 7500})
    break
  case "no-reservation-found":
    toast.error("Hiba! Ez a foglalás nem létezik.", {autoClose: 7500})
    break
  case "successful-feedback":
    toast.success("Visszajelzés sikeresen elküldve.")
    break
  case "reservationSubmitted":
    toast.success(
      <p style={{padding: ".5rem",
        fontSize: "1.2rem"}}
      >Foglalását rögzítettük. <br/>
        <span style={{fontSize: "1rem"}}>
        Néhány másodperc múlva visszakerül a főoldalra. További kérdésével fordulhat:<br/>
          <a
            href="mailto:info&#64;bibicvendeghazak.hu"
            style={{color: "white"}}
          >info kukac bibicvendeghazak pont hu</a><br/>
          <a
            href="tel:+36305785730"
            style={{color: "white"}}
          >+36 30 578 5730</a>
        </span>
      </p>, {autoClose: 7500})
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
            href="mailto:info&#64;bibicvendeghazak.hu"
            style={{color: "white"}}
          >info kukac bibicvendeghazak pont hu</a><br />
          <a
            href="tel:+36305785730"
            style={{color: "white"}}
          >+36 30 578 5730</a>
        </span>
      </p>, {autoClose: 7500})
    break
  case "error":
    toast.error(
      <p style={{padding: ".5rem",
        fontSize: "1.2rem"}}
      >Hiba: {message}<br/>
        <span style={{fontSize: "1rem"}}>
    Ha a probléma tartósan fennáll, jelezze itt: <a href={`mailto:hiba&#64;bibicvedeghazak.hu?subject=Hibajelentés&body=${message}`}>hiba kukac bibicvedeghazak pont hu</a>
        </span>
      </p>, {autoClose: 10000})
    break
  default:
    toast.info(type)
    break
  }
}