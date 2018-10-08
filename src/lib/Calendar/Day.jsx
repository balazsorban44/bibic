import React, {Component} from 'react'
import moment from "moment"
import {colors} from '../../utils/colors'

class Day extends Component {

  state = {
    value: null,
    selectable: true,
    selected: null,
    disabled: false,
    hovered: false,
    placeholder: false
  }

  componentDidUpdate = (_prevProps, prevState) => {
    const props = this.props
    if (prevState.disabled !== props.disabled) this.setState({disabled: props.disabled})
    if (prevState.selectable !== props.selectable) this.setState({selectable: props.selectable})
    if (prevState.hovered !== props.hovered) this.setState({hovered: props.hovered})
  }

  handleMouseEnter = () => {
    const {
      disabled, selectable
    } = this.state
    const {
      value, onDayHover
    } = this.props
    !disabled && selectable && this.setState({hovered: true})
    !disabled && selectable && onDayHover(value)
  }

  handleMouseLeave = () => {
    const {
      disabled, selectable
    } = this.state
    !disabled && selectable && this.setState({hovered: false})
  }

  handleClick = () => {
    const {
      disabled, selectable
    } = this.state
    const {
      value, onDayChange
    } = this.props
    !disabled && selectable && onDayChange(value)
  }


  render() {
    const {
      value, selectable, selected, disabled, placeholder, style,
      isStart, isEnd
    } = this.props
    const {hovered} = this.state

    return (
      <div
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseEnter}
        style={{
          cursor: !disabled && selectable ? "pointer" : "auto",
          fontWeight: !disabled ? "normal" : "light",
          borderTopLeftRadius: isStart ? 24 : 0,
          borderBottomLeftRadius: isStart ? 24 : 0,
          borderTopRightRadius: isEnd ? 24 : 0,
          borderBottomRightRadius: isEnd ? 24 : 0,
          position: "relative",
          /*
           * width: 48,
           * height: 44,
           */
          display: "grid",
          placeItems: "center",
          background: hovered && !disabled ? colors.accent.primary : selected ? colors.accent.primaryDarker : "",
          backgroundImage: (disabled || !selectable) ? "linear-gradient(135deg, transparent 12.50%, #88888844 12.50%, #88888844 25%, transparent 25%, transparent 37.50%, #88888844 37.50%, #88888844 50%, transparent 50%, transparent 62.50%, #88888844 62.50%, #88888844 75%, transparent 75%, transparent 87.50%, #88888844 87.50%, #88888844 100%)": "",
          backgroundSize: (disabled || !selectable ) ? "48px 48px" : "",
          color: (hovered || selected) && !disabled ? "white" : "black",
          opacity: !selectable ? 0.2 : (disabled || placeholder) ? 0.7 : 1,
          userSelect: disabled || !selectable ? "none" : "auto",
          ...style
        }}
      >
        {value && moment(value).format("D")}
      </div>
    )
  }
}

export default Day