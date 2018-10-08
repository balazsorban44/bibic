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
    toast.info("Dátumok kiválasztva.", {
hideProgressBar: true,
      autoClose: 1000
})
    break
  case "useCalendarAsInput":
    toast.warn("Kérjük, hogy az érkezés és távozás kiválasztásához használja a naptárat.")
    break
  case "wrongInput":
    toast.error(`${message} Ha úgy gondolja más a hiba oka, kérjük írjon az alábbi címre: hiba@bibicvedeghazak.hu`, {autoClose: 7500})
    break
  default:
    toast.info(type)
    break
  }
}