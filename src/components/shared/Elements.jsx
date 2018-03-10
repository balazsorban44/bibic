import React from 'react'
import arrow from '../../media/icons/arrow.svg'
import swipe from '../../media/icons/swipe.svg'

const Prev = ({onClick}) => (
  <div
    className="slider-arrow slider-arrow-prev"
    onClick={onClick}
  ><img alt="" src={arrow}/></div>
)

const Next = ({onClick}) => (
  <div
    className="slider-arrow slider-arrow-next"
    onClick={onClick}
  ><img alt="" src={arrow}/></div>
)

const SwipeIcon = (props, {isShowingSwipe = true}) => <img {...props} className={`swipe-icon ${!isShowingSwipe ? "is-touched": ""}`} alt="" src={swipe}/>


export {
  Prev, Next, SwipeIcon
}