import React, {Component} from 'react'


class Stars extends Component {


  state = { }

  defaultSize = 25

  render() {
    const {
      value, title, size
    } = this.props
    return (
      <div className="stars-wrapper">
        <div className="stars-header">
          <h4>{title}:</h4>
          <h5>{value}</h5>
        </div>
        <div
          className="stars"
          data-stars={Math.floor(value) || 0}
        >
          {Array(5).fill(null).map((_e, i) =>
            <svg
              className="star rating"
              data-rating={i+1}
              height="25"
              key={i}
              width="25"
            >
              <polygon
                points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                style={{fillRule: "nonzero", transform: `scale(${size ? size / this.defaultSize: 1})`}}
              />
            </svg>
          )}
        </div>
      </div>
    )
  }
}

export default Stars