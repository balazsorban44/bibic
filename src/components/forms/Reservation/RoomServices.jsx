import React, {useContext} from 'react'
import {Store} from 'db'
import {Loading} from 'components/shared/Elements'
import { useTranslation } from 'react-i18next';

export default ({selected}) => {
  const {roomServices} = useContext(Store)
  const [t] = useTranslation("reservation")
  return (

    <>
      <h5>{t("room-facilities")}</h5>
        <div className="room-services">
          {roomServices.length ? roomServices.map(([
            key, {
              inRoom, name, icon
            }
          ]) =>
            <div
              className={`room-service ${
                Object.values(inRoom).includes(selected) ?
                  "service-in-room" :
                  ""
              }`}
              key={key}
            >
              <img
                alt={name}
                src={icon}
              />
              <span>{name}</span>
            </div>
          ) : <Loading/>}
        </div>
    </>
  )
}