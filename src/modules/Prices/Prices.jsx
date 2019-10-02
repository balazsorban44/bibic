import React from "react"
import {Link} from "react-router-dom"
import Fade from "react-reveal/Fade"
import {useTranslation} from "react-i18next"
import routes from "utils/routes"


import "./prices.sass"
import Button from "ui/Button"
import Text from "ui/Text"
import Section from "ui/Section"

const options = [
  {title: 6000, to: routes.RESERVE},
  {title: 6000, to: `${routes.MESSAGE}?subject=eventHall`},
  {title: 90000, to: `${routes.MESSAGE}?subject=fullHouse`}
]


export default function Prices() {
  const [t] = useTranslation("prices")
  return (
    <Section
      id="arak"
      title={t("title")}
    >
      <Fade cascade up>
        <ul className="price-list">
          {options.map(({title, to}, index) => {
            const {suffix, name, subtitle, button} = t(`options.${index}`, {returnObjects: true})
            return (
              <li key={index}>
                <div className="price-content">
                  <Text variant="h3">{title}<span>{suffix}<sup>*</sup></span></Text>
                  <Text variant="h4">{name}</Text>
                  <Text variant="h5">{subtitle}</Text>
                </div>
                <Button
                  className="price-button"
                  component={Link}
                  size="large"
                  to={to}
                >
                  {button}
                </Button>
              </li>
            )
          }
          )}
        </ul>
      </Fade>
      <Link to="uzenet?tema=kulonajanlat">
        <div className="special">
          <h4>{t("special.0")}</h4>
          <h5>{t("special.1")}</h5>
          <span></span>
        </div>
      </Link>
      <p>{t("footnote")}</p>
    </Section>
  )
}