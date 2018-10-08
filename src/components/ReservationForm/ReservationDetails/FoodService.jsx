import React, {Fragment} from 'react'
import {Service} from '../../shared/Form'
import {withStore} from '../../db'


const FoodService = ({
  reservation: {foodService}, updateReservation
}) =>
  <Fragment>
    <Service
      checked={foodService==="breakfast"}
      label="reggeli"
      name="foodService"
      onChange={updateReservation}
      value="breakfast"
    />
    <Service
      checked={foodService==="halfBoard"}
      label="félpanzió"
      name="foodService"
      onChange={updateReservation}
      value="halfBoard"
    />
  </Fragment>

export default withStore(FoodService)