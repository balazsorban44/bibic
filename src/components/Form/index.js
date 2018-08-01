import React, {Fragment} from 'react'

const FormSection = ({
  title, children
}) => (
  <Fragment>
    <h4>{title}</h4>
    {children}
  </Fragment>
)


const FormGroup = ({
  title, className, children, footnote
}) => (
  <Fragment>
    {title && <h5>{title}</h5>}
    <div className={`form-group ${className}`}>
      {children}
      {footnote &&<span className="footnote">{footnote}</span>}
    </div>
  </Fragment>
)


export {FormSection, FormGroup}