import React, {Component, Fragment} from 'react'
import Slider from 'react-slick'
import {Prev, Next, SwipeIcon} from './shared/Elements'
import {BackMenu} from '../components/Menu'
import { DB } from '../lib/firebase'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
export default class Foods extends Component {

  state = {
    foods: null,
    isShowingSwipe: false
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    DB.ref("foods")
      .on("value", snap => this.setState({foods: snap.val()}))
  }


  render() {
    const {foods} = this.state
    
    return (
      <Fragment>
        <BackMenu/>
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
              bottom: "10%"
            }}/>
        </div>
      </Fragment>
    )
  }
}


