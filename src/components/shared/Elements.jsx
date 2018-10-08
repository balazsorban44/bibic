import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// For the slider elements
import arrow from '../../assets/icons/arrow.svg'
import swipe from '../../assets/icons/swipe.svg'

export const Prev = ({previousSlide}) =>
  <div
    className="slider-arrow slider-arrow-prev"
    onClick={previousSlide}
  >
    <img
      alt=""
      src={arrow}
    />
  </div>


export const Next = ({nextSlide}) =>
  <div
    className="slider-arrow slider-arrow-next"
    onClick={nextSlide}
  >
    <img
      alt=""
      src={arrow}
    />
  </div>


export const SwipeIcon = ({
  isShowingSwipe = true, ...rest
}) =>
  <img
    {...rest}
    alt=""
    className={`swipe-icon ${!isShowingSwipe ? "is-touched": ""}`}
    src={swipe}
  />


export class Loading extends Component {

  state = {isTimedOut: false}

  componentDidMount() {
    const timeout = setTimeout(() => this.setState({isTimedOut: true}), 10000)
    clearTimeout(timeout)
  }


  render() {
    return (
      // TODO: Add better empty state
      this.state.isTimedOut ?
        <p className="not-available">
          A tartalom nem elérhető
        </p> :
        <div className="loading"><div className="spinner"/></div>
    )
  }
}

export const Button = ({
  label, to
}) =>
  <Link {...{to}} >{label}</Link>


export const Tooltip = ({
  title, children
}) =>
  title ?
    <div className="tooltip-wrapper">
      <span className="tooltip">
        {title}
      </span>
      {children}
    </div>
    : children