import React, {useContext, useCallback, memo} from 'react'
import {Store} from 'db'
import {Loading} from 'components/shared/Elements'
import { useTranslation } from 'react-i18next';

export default memo(({onChange, selected}) => {
  
  const [t] = useTranslation("reservation")
  const {rooms, reservation: {adults, children}} = useContext(Store)
  
  const handleChange = useCallback(id => {
    /*
     * Correct adults and children, if selected room 
     * has less place than the currently selected
     */
    const {maxPeople} = rooms[id-1].prices.metadata
    const c = [...children]
    let a = adults
    while(a + c.length > maxPeople) c.pop()
    while(a > maxPeople) a-=1

    onChange({roomId: id, adults: a, children: c})
  }, [rooms, onChange, adults, children])

  return (
    <>
      <h4>{t("select")} {selected ? `(${t("room-selected", {roomNumber: selected})})` : ""}</h4>
      {rooms.length ?
        <div className="room-picker">
          {Object.values(rooms).map(({id}) =>
            <div
              className={`room-picker-room ${selected === id ? "room-active" : ""}`}
              id={`szoba-${id}`}
              key={id}
            >
              <span
                className="button"
                onClick={() => handleChange(id)}
              >
                {id}
              </span>
            </div>
          )}
        </div> :
        <Loading/>
      }
    </>
  )
})