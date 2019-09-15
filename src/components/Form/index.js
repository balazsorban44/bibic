import React from "react"
import {Send, PeopleCount, Children} from "./inputs"


const FormSection = ({title, children}) =>
  <>
    <h4>{title}</h4>
    {children}
  </>


const FormGroup = ({title, className, children, footnote}) =>
  <>
    {title && <h5>{title}</h5>}
    <div className={`form-group ${className}`}>
      {children}
      {footnote &&<span className="footnote">{footnote}</span>}
    </div>
  </>


export {FormSection, FormGroup, Send, PeopleCount, Children}