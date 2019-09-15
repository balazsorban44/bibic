import React from "react"
import {useTranslation} from "react-i18next"

import Loading from "components/Loading"
import useSubscription from "hooks/useSubscription"

export default ({selected}) => {
  const [t] = useTranslation("reservation")
  const [value, loading] = useSubscription({ref: "roomServices", initialState: []})

  return (
    <>
      <h5>{t("room-facilities")}</h5>
        <div className="room-services">
          {loading ? <Loading/> :
            Object.entries(value).map(([key, {inRoom, name, icon}]) =>
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
            )}
        </div>
    </>
  )
}