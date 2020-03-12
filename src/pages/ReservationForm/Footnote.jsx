import React from 'react'
import BANK from '../../assets/icons/bank.png'
import CASH from '../../assets/icons/cash.png'
import MASTERCARD from '../../assets/icons/mastercard.png'
import SZEP from '../../assets/icons/szep.jpg'
import VISA from '../../assets/icons/visa.png'
import {useTranslation} from 'react-i18next'

const Footnote = () => {
  const [t] = useTranslation()
  return (
    <span className="footnote">{t("reservation.accepted-payment-methods")}
      <ul className="payment-methods">
        <li>
          <h6>{t("reservation.payment-methods.cash.title")}</h6>
          <img
            alt={t("reservation.payment-methods.cash.alt")}
            src={CASH}
          />
        </li>
        <li>
          <h6>{t("reservation.payment-methods.wire-transfer.title")}</h6>
          <img
            alt={t("reservation.payment-methods.wire-transfer.alt")}
            src={BANK}
          />
        </li>
        <li>
          <h6>Visa</h6>
          <img
            alt={t("reservation.payment-methods.visa.alt")}
            src={VISA}
          />
        </li>
        <li>
          <h6>Mastercard</h6>
          <img
            alt={t("reservation.payment-methods.mastercard.alt")}
            src={MASTERCARD}
          />
        </li>
        <li>
          <h6>OTP SZÉP</h6>
          <img
            alt={t("reservation.payment-methods.otp.alt")}
            src={SZEP}
          />
        </li>
      </ul>
      {t("reservation.no-payment-warning")}
      <a href="mailto:szallasfoglalas&#64;bibicvendeghazak.hu">{t("reservation.reservation-email")}</a>
    </span>
  )
}

export default Footnote