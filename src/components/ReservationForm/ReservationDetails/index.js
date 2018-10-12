import React, {Fragment} from 'react'
import {Link} from "react-router-dom"
import {withStore} from '../../db'
import People from './People'
import FoodService from './FoodService'
import {FormGroup} from '../../shared/Form'
import Calendar from './Calendar'


const ReservationDetails = ({rooms, reservation: {roomId}}) => {
  const maxPeople = (rooms && roomId && rooms[roomId-1] && rooms[roomId-1].prices.metadata.maxPeople) || 1

  return (
    <Fragment>
      <FormGroup
        className="dates"
        footnote="érkezés: 14:00-tól, távozás: 10:00-ig"
        title={"érkezés/távozás"}
      >
        <Calendar/>
      </FormGroup>
      <FormGroup
        footnote="6 év alatt ingyenes"
        title={`személyek (maximum ${maxPeople} fő)`}
      >
        <People {...{maxPeople}}/>
      </FormGroup>
      <FormGroup
        className="services"
        footnote={
          <Fragment>
          az ételeket előre kell kiválasztani, mivel nem üzemeltetünk éttermet <Link to="etelek">főbb ételeinket ide kattintva találja →</Link>
          </Fragment>
        }
        title="ellátás"
      >
        <FoodService/>
      </FormGroup>
    </Fragment>
  )
}

export default withStore(ReservationDetails)