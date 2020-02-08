import React from "react"
import {Send, PeopleCount, Children} from "./inputs"
import "./form-group.sass"
import clsx from "clsx"

const FormSection = ({title, children}) =>
  <>
    <h4>{title}</h4>
    {children}
  </>


const FormGroup = ({title, className, children, footnote}) =>
  <>
    <div className={clsx("form-group", className)}>
      {children}
    </div>
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: ".5em", marginBottom: "2em"}}>
      {footnote && <span className="footnote">{footnote}</span>}
      {title && <h5>{title}</h5>}
    </div>
  </>


export {FormSection, FormGroup, Send, PeopleCount, Children}