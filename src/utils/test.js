import {render} from "@testing-library/react"
import {MemoryRouter} from "react-router-dom"
import {I18nextProvider} from "react-i18next"
import i18n from "lib/i18n"
import Database from "db"

const wrapper = ({children}, {context={}, router={}}) =>
  <I18nextProvider i18n={i18n}>
    <MemoryRouter {...router}>
      <Database context={context}>
        {children}
      </Database>
    </MemoryRouter>
  </I18nextProvider>


const customRender = (ui, options={}) =>
  render(ui, {wrapper: props => wrapper(props, {router: options.router, context: options.context}), ...options})


export * from "@testing-library/react"

export {customRender as render}


