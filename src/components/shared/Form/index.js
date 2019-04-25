import React from 'react'
import {Date, Send, PeopleCount, Children, Service} from "./inputs"


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


export {FormSection, FormGroup, Date, Send, PeopleCount, Children, Service}