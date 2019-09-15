import React from "react"
import "./stars.sass"

const Stars = ({value, title, size}) =>
  <div className="stars-wrapper" title={value}>
    <div className="stars-header">
      <h4>{title}</h4>
      <h5>{value}</h5>
    </div>
    <div
      className="stars"
      data-stars={Math.floor(value) || 0}
    >
      {Array.from({length: 5}, (_, i) =>
        <svg
          className="star rating"
          data-rating={i+1}
          height="25"
          key={i}
          style={{transformOrigin:"center", fillRule: "nonzero", transform: `scale(${size ? size / 25: 1})`}}
          width="25"
        >
          <polygon
            points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
          />
        </svg>
      )}
    </div>
  </div>

export default Stars