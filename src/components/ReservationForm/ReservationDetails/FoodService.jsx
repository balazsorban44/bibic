import React from 'react'
import {Service} from '../../shared/Form'
import {withStore} from '../../db'

// REVIEW: Fetch service types dinamically?
const FoodService = ({reservation: {foodService}, updateReservation}) =>
  <>
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
  </>

export default withStore(FoodService)