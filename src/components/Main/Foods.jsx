import React, {Component} from 'react'
import Slider from 'react-slick'
import {Prev, Next, SwipeIcon} from '../shared/Elements'
import { DB } from '../../lib/firebase'

export default class Foods extends Component {

  state = {
    foods: null,
    isShowingSwipe: false
  }
  componentDidMount() {
    DB.ref("foods").on("value", snap => {
      this.setState({foods: snap.val()})
    })
  }


  render() {
    const {foods} = this.state
    
    return (
      <div
        onTouchStart={this.handleSwipe}
        id="etelek">
        <Slider className="foods"
          prevArrow={<Prev/>}
          nextArrow={<Next/>}
          adaptiveHeight
        >
          {foods && Object.keys(foods).map(foodId => {
            const {title, desc, picture: {resized}} = foods[foodId]
            return (
              <div key={foodId} className="food">
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
                <img alt={title} src={resized}/>
              </div>
            )
          })}
        </Slider>
        <SwipeIcon 
          style={{
            position: "absolute",
            bottom: "5%"
          }}/>
      </div>
    )
  }
}


