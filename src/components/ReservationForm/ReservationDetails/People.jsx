import React from 'react'
import {withStore} from '../../db'
import {PeopleCount, Children} from '../../shared/Form'


const People = ({
  reservation: {adults, children}, updateReservation, maxPeople
}) =>
  <>
    <PeopleCount
      label="felnőtt"
      max={maxPeople - children.length}
      min={1}
      name="adults"
      onChange={updateReservation}
      placeholder={1}
      value={adults}
    />
    <Children
      hasFootnote
      label="gyerek"
      max={maxPeople - adults}
      name="children"
      onChange={updateReservation}
      values={children}
    />
  </>

export default withStore(People)