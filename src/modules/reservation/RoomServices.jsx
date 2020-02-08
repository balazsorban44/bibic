import React from "react"

import Loading from "ui/Loading"
import Icon from "ui/Icon"
import clsx from "clsx"
import useSubscription from "hooks/useSubscription"

export default ({
  roomId,
  iconProps={width: 24},
  showCaption = true,
  title = null
}) => {
  const [facilities, loading] = useSubscription({ref: "roomServices"})

  if (loading) {
    return <Loading/>
  }

  return (
    <>
      {title}
      <div className="room-services">
        {Object.entries(facilities).map(([key, {inRoom, name, icon}]) =>
          <div
            className={clsx(
              "room-service",
              {"service-in-room": Object.values(inRoom).includes(roomId)}
            )}
            key={key}
          >
            <Icon
              alt={name}
              src={icon}
              title={name}
              {...iconProps}
            />
            {showCaption ? <span>{name}</span> : null}
          </div>
        )}
      </div>
    </>
  )
}