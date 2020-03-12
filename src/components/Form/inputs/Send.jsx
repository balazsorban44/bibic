import React from 'react'
import {Loading} from "../../Elements"
import {useTranslation} from 'react-i18next'

const Send = ({isLoading, context = "general", ...props}) => {
  const [t] = useTranslation()
  if (isLoading) {
    return(
      <div style={{padding: "24px 0 48px"}} >
        <Loading/>
      </div>
    )
  }
  return (
    <button
      className="submit"
      title={props.disabled ? t("form.send-disabled", {context}) : ""}
      {...props}
    />
  )
}

export default Send