import React from "react"
import {Link} from "react-router-dom"


export default function Button ({label, to}) {
  return (
    <Link {...{to}} >{label}</Link>
  )
}