import React from "react"
import {useTranslation} from "react-i18next"


import BANK from "assets/icons/bank.png"
import CASH from "assets/icons/cash.png"
import MASTERCARD from "assets/icons/mastercard.png"
import SZEP from "assets/icons/szep.jpg"
import VISA from "assets/icons/visa.png"

const methods = [CASH, BANK, VISA, MASTERCARD, SZEP]
const Footnote = () => {
  const [t] = useTranslation("reservation")
  return (
    <span className="footnote">
      {t("payment-methods.title")}
      <ul className="payment-methods">
        {methods.map((method, index) =>
          <li key={index}>
            <img
              alt={t(`payment-methods.altOptions.${index}`)}
              src={method}
            />
            <h6>{t(`payment-methods.options.${index}`)}</h6>
          </li>
        )}
      </ul>
      {t("payment-methods.footnote")}
      <a href="mailto:szallasfoglalas&#64;bibicvendeghazak.hu">{t("reservation-email")}</a>
    </span>
  )
}

export default Footnote