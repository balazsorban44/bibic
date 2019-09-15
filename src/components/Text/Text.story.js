import React from "react"
import {storiesOf} from "@storybook/react"
import Text from "./Text"

storiesOf("Text", module)
  .add("default", () => <Text>Text</Text>)
  .add("h1", () => <Text variant="h1">Text</Text>)
  .add("h2", () => <Text align="center" variant="h2">Text</Text>)
  .add("h3", () => <Text align="center" variant="h3">Text</Text>)
  .add("h4", () => <Text variant="h4">Text</Text>)
  .add("h5", () => <Text variant="h5">Text</Text>)
  .add("h6", () => <Text variant="h6">Text</Text>)
  .add("paragraph", () => <Text variant="paragraph">Text</Text>)
  .add("button", () => <Text variant="button">Text</Text>)