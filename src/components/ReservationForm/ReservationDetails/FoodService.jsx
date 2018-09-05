import React, {Fragment} from 'react'
import {Service} from '../../shared/Form'
import {withStore} from '../../db'


const FoodService = ({
  reservation: {activeService}, updateReservation
}) =>
  <Fragment>
    <Service
      checked={activeService==="breakfast"}
      label="reggeli"
      name="activeService"
      onChange={updateReservation}
      value="breakfast"
    />
    <Service
      checked={activeService==="halfBoard"}
      label="félpanzió"
      name="activeService"
      onChange={updateReservation}
      value="halfBoard"
    />
  </Fragment>

export default withStore(FoodService)