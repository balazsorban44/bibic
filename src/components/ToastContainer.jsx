import React from 'react'
import {ToastContainer} from 'react-toastify'


export default () =>
  <ToastContainer
    closeOnClick
    position="bottom-center"
    style={{
      position: "fixed",
      zIndex: 10001,
      bottom: 0
    }}
  />