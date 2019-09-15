import React from "react"
import {storiesOf} from "@storybook/react"
import Button from "./Button"

storiesOf("Button", module)
  .add("default", () => <Button>Button</Button>)
  .add("accent-dark, small", () => <Button color="accent-dark" size="small">Button</Button>)
  .add("accent-2", () => <Button color="accent-2">Button</Button>)
  .add("accent-3", () => <Button color="accent-3">Button</Button>)
  .add("accent-4", () => <Button color="accent-4">Button</Button>)
  .add("accent-5", () => <Button color="accent-5">Button</Button>)
  .add("success", () => <Button color="success">Button</Button>)
  .add("warning", () => <Button color="warning">Button</Button>)
  .add("destructive, large", () => <Button color="destructive" size="large">Button</Button>)