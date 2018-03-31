import React, {Component} from 'react'

// For the slider elements
import arrow from '../../assets/icons/arrow.svg'
import swipe from '../../assets/icons/swipe.svg'

// For notifications
import errorIcon from '../../assets/icons/error.svg'
import warningIcon from '../../assets/icons/warning.svg'
import successIcon from '../../assets/icons/success.svg'
import infoIcon from '../../assets/icons/info.svg'

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


export class Notification extends Component {

  state = {
    color: "444"
  }

  componentDidMount() {
    
    let color = ""
    switch (this.props.type) {
      case "warning":
        color = "#c4960d"
        break
      case "error":
        color = "#7f0606"
        break
      case "success":
        color = "#30893f"
        break
      default:
        color = "#444444"
    }
    this.setState({color})
  }

  icon = type => {
    switch (type) {
      case "error":
        return errorIcon
      case "warning":
        return warningIcon
      case "success":
        return successIcon   
      default:
        return infoIcon
    }
  }
  render() {
    const {message, type} = this.props
    const {color} = this.state
    return (
      <div className="notification"
        style={{background: color}}
      >
        {message}
        <img src={this.icon(type)} alt="Üzenet ikon"/>
      </div>
    )
  }
}