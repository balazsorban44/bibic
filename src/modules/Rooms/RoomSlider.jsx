import React, {Component} from "react"
import Button from "ui/Button"

export class RoomSlider extends Component {
  static defaultProps = {delay: 10000, pictures: []}

  state = {activeIndex: 0, max: 0}

  componentDidMount() {
    const {delay, pictures} = this.props
    this.setState({max: pictures.length}, () => {
      this.interval = setInterval(this.handleTick, delay)
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleTick = () => {
    this.setState(({activeIndex: prevIndex}) => {
      const incrementedIndex = prevIndex + 1
      return ({activeIndex: incrementedIndex >= this.state.max ? 0 : incrementedIndex})
    })
  }

  render() {
    const {pictures} = this.props
    const {activeIndex, max} = this.state
    return(
      <div className="room-slider-container">
        <ul className="room-slider">
          {pictures
            .sort((a, b) => a.order - b.order)
            .map((picture, index) =>
              <Slide
                active={activeIndex===index}
                index={index}
                key={index}
                {...picture}
              />
            )}
        </ul>
        <Dots
          activeIndex={activeIndex}
          length={max}
        />
        <Button
          circle
          className="room-slider-next-btn"
          onClick={this.handleTick}
        />
      </div>
    )
  }
}

export const Slide = ({active, index, fileName, SIZE_640, SIZE_1024, SIZE_1440}) =>
  <li
    className={active ? "room-first-slide" : "room-placeholder-slide"}
    style={{zIndex: active ? 99 : -index}}
  >
    <picture>
      <source
        media="(min-width: 640px)"
        srcSet={SIZE_1024}
      />
      <source
        media="(min-width: 1024px)"
        srcSet={SIZE_1440}
      />
      <img
        alt={fileName}
        src={SIZE_640}
      />
    </picture>
  </li>


export const Dots = ({length, activeIndex}) =>
  <div className="room-slider-dots">
    {Array(length).fill().map((_e, i) =>
      <span
        children="•"
        className={
          `room-slider-dot ${activeIndex===i ?"active-slide": ""}`}
        key={i}
      />
    )}
  </div>