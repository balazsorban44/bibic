import React from 'react'

// For the slider elements
import arrow from '../../assets/icons/arrow.svg'
import swipe from '../../assets/icons/swipe.svg'

export const Prev = ({onClick}) => (
  <div
    className="slider-arrow slider-arrow-prev"
    onClick={onClick}
  ><img alt="" src={arrow}/></div>
)

export const Next = ({onClick}) => (
  <div
    className="slider-arrow slider-arrow-next"
    onClick={onClick}
  ><img alt="" src={arrow}/></div>
)

export const SwipeIcon = (props, {isShowingSwipe = true}) => <img {...props} className={`swipe-icon ${!isShowingSwipe ? "is-touched": ""}`} alt="" src={swipe}/>




export const Loading = () => <div className="loading"><div className="spinner"/></div>