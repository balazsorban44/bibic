import React from "react"

import "@testing-library/react/cleanup-after-each"
import "jest-dom/extend-expect"

global.React = React


window.scrollTo = jest.fn()
window.alert = jest.fn()