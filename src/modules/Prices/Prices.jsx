import React from "react"
import {Link} from "react-router-dom"
import Fade from "react-reveal/Fade"
import {useTranslation} from "react-i18next"
import routes from "utils/routes"


import "./prices.sass"
import Button from "ui/Button"
import Text from "ui/Text"
import Section from "ui/Section"
import Card, {CardHeader, CardContent, CardActions} from "ui/Card"

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
              <Card
                color={`color-${index+1}`}
                component="li"
                key={to}
              >
                <CardHeader
                  subtitle={<span>{suffix}<sup>*</sup></span>}
                  title={title}
                />
                <CardContent>
                  <Text component="p">{name}</Text>
                  <Text component="p">{subtitle}</Text>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    size="large"
                    to={to}
                  >
                    {button}
                  </Button>
                </CardActions>
              </Card>
              // <li key={index}>
              //   <div className="price-content">
              //     <Text component="h3">{title}<span>{suffix}<sup>*</sup></span></Text>
              //     <Text component="h4">{name}</Text>
              //     <Text component="h5">{subtitle}</Text>
              //   </div>
              //   <Button
              //     className="price-button"
              //     component={Link}
              //     size="large"
              //     to={to}
              //   >
              //     {button}
              //   </Button>
              // </li>
            )
          }
          )}
        </ul>
      </Fade>
      <Fade delay={250} up>
        <Text component="h3">
          <Text component={Link} to="uzenet?tema=kulonajanlat">
            <span className="special">
              <span>{t("special.0")}</span>
              <span>{t("special.1")}</span>
              <span></span>
            </span>
          </Text>
        </Text>
      </Fade>
      <Fade delay={500} up >
        <Text>
          {t("footnote")}
        </Text>
      </Fade>
    </Section>
  )
}