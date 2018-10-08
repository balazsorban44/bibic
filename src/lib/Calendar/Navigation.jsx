import React from 'react'
import PropTypes from 'prop-types'

const NavigationArrow = ({
  onNavigation, direction, children, disabled
}) => {
  return (
    <div
      onClick={() => !disabled && onNavigation(direction)}
      style={{
        position: "relative",
        transform: direction === -1 ? "rotate(180deg)": "",
        transformOrigin: "center",
        height: 48,
        fontSize: "1.2em",
        width: 48,
        opacity: disabled ? 0.5 : 1,
        filter: disabled ? "grayscale(.5)": "",
        display: "grid",
        placeItems: "center",
        cursor: disabled ? "auto" : "pointer",
        userSelect: "none"
      }}
    >
      {children}
    </div>
  )
}

NavigationArrow.defaultProps = {disabled: false}
NavigationArrow.propTypes = {
  direction: PropTypes.oneOf([-1, 1, 0]).isRequired,
  onNavigation: PropTypes.func.isRequired
}


const Navigation = ({
  onNavigation, month, min, icon, iconStyle, style
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        ...style
      }}
    >
      <NavigationArrow
        direction={-1}
        disabled={min && month.clone().add(-1, "month").isBefore(min, "month")}
        onNavigation={onNavigation}
      >
        <div
          style={iconStyle}
          title="Előző hónap"
        >
          <img
            alt=""
            src={icon}
          />
        </div>
      </NavigationArrow>
      <NavigationArrow
        direction={0}
        onNavigation={onNavigation}
      >
        <div
          style={iconStyle}
          title="Ugrás a mára"
        >•</div>
      </NavigationArrow>
      <p
        style={{
          flex: 1,
          textAlign: "center"
        }}
      >{month.format("YYYY MMM")}</p>
      <NavigationArrow
        direction={1}
        onNavigation={onNavigation}
      >
        <div
          style={iconStyle}
          title="Következő hónap"
        >
          <img
            alt=""
            src={icon}
          />
        </div>
      </NavigationArrow>
    </div>
  )
}


Navigation.propTypes = {onNavigation: PropTypes.func.isRequired}

export default Navigation