import React from 'react'
import {useTranslation} from 'react-i18next'

const Textarea = ({name = "content", inputs, ...props}) => {
  const [t] = useTranslation()
  return (
    <textarea
      {...inputs.text(name, {
        generateProps: ({error}) => ({
          style: error ? {
            borderColor: "#7f0606"
          } : undefined
        })
      })}
      placeholder={t("form.messageInput.placeholder")}
      rows="8"
      {...props}
    />
  )
}

export default Textarea